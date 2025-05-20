import { ConvexError, v } from "convex/values";
import { sanitizeStringServer } from "../lib/utils";
import { mutation, MutationCtx, query } from "./_generated/server";

// Helper function to parse quantity string into amount and unit
export const parseQuantity = (
  quantityStr: string,
): { amount: number; unit: string } | null => {
  const match = quantityStr.trim().match(/^([\d.]+)\s*(.*)$/);
  if (!match) return null;

  const amount = parseFloat(match[1]);
  const unit = match[2].trim();

  if (isNaN(amount)) return null;
  return { amount, unit: sanitizeStringServer(unit) };
};

// Add a new item to the grocery list
export const addItem = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    quantity: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Sanitize inputs
    const sanitizedName = sanitizeStringServer(args.name);
    const sanitizedQuantity = args.quantity
      ? sanitizeStringServer(args.quantity)
      : undefined;

    // Check if item with same name already exists
    const existingItem = await ctx.db
      .query("groceryItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("name"), sanitizedName))
      .first();

    if (existingItem && sanitizedQuantity && existingItem.quantity) {
      // Parse quantities
      const newQuantity = parseQuantity(sanitizedQuantity);
      const existingQuantity = parseQuantity(existingItem.quantity);

      // If both quantities have the same unit, combine them
      if (
        newQuantity &&
        existingQuantity &&
        newQuantity.unit === existingQuantity.unit
      ) {
        const totalAmount = newQuantity.amount + existingQuantity.amount;
        const updatedQuantity = `${totalAmount} ${newQuantity.unit}`;

        // Update the existing item
        await ctx.db.patch(existingItem._id, {
          quantity: updatedQuantity,
        });

        return existingItem._id;
      }
    }

    // If no existing item or units don't match, create a new item
    return await ctx.db.insert("groceryItems", {
      userId: args.userId,
      name: sanitizedName,
      quantity: sanitizedQuantity,
      checked: false,
    });
  },
});

// Helper function to add or update grocery items
export const addOrUpdateGroceryItem = async (
  ctx: MutationCtx,
  userId: string,
  name: string,
  quantity: string,
) => {
  // Sanitize inputs
  const sanitizedName = sanitizeStringServer(name);
  const sanitizedQuantity = sanitizeStringServer(quantity);

  // Check if item with same name already exists
  const existingItem = await ctx.db
    .query("groceryItems")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .filter((q) => q.eq(q.field("name"), sanitizedName))
    .first();

  if (existingItem && existingItem.quantity) {
    // Parse quantities
    const newQuantity = parseQuantity(sanitizedQuantity);
    const existingQuantity = parseQuantity(existingItem.quantity);

    // If both quantities have the same unit, combine them
    if (
      newQuantity &&
      existingQuantity &&
      newQuantity.unit === existingQuantity.unit
    ) {
      const totalAmount = newQuantity.amount + existingQuantity.amount;
      const updatedQuantity = `${totalAmount} ${newQuantity.unit}`;

      // Update the existing item
      await ctx.db.patch(existingItem._id, {
        quantity: updatedQuantity,
      });

      return existingItem._id;
    }
  }

  // If no existing item or units don't match, create a new item
  return await ctx.db.insert("groceryItems", {
    userId,
    name: sanitizedName,
    quantity: sanitizedQuantity,
    checked: false,
  });
};

// Delete an item from the grocery list
export const deleteItem = mutation({
  args: {
    userId: v.string(),
    id: v.id("groceryItems"),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (!item) throw new ConvexError("Item not found");
    if (item.userId !== args.userId) throw new ConvexError("Not authorized");

    await ctx.db.delete(args.id);
  },
});

// Toggle the checked status of an item
export const toggleItem = mutation({
  args: {
    userId: v.string(),
    id: v.id("groceryItems"),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (!item) throw new ConvexError("Item not found");
    if (item.userId !== args.userId) throw new ConvexError("Not authorized");

    await ctx.db.patch(args.id, { checked: !item.checked });
  },
});

// Update an item's details
export const updateItem = mutation({
  args: {
    userId: v.string(),
    id: v.id("groceryItems"),
    name: v.optional(v.string()),
    quantity: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (!item) throw new ConvexError("Item not found");
    if (item.userId !== args.userId) throw new ConvexError("Not authorized");

    const updates: { name?: string; quantity?: string } = {};
    if (args.name !== undefined) updates.name = sanitizeStringServer(args.name);
    if (args.quantity !== undefined)
      updates.quantity = sanitizeStringServer(args.quantity);

    await ctx.db.patch(args.id, updates);
  },
});

// Get all items in the grocery list
export const listItems = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("groceryItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Search for items in the grocery list
export const searchItems = query({
  args: {
    userId: v.string(),
    query: v.string(),
  },
  handler: async (ctx, args) => {
    // Sanitize search query
    const sanitizedQuery = sanitizeStringServer(args.query);

    return ctx.db
      .query("groceryItems")
      .withSearchIndex("search_name", (q) =>
        q.search("name", sanitizedQuery).eq("userId", args.userId),
      );
  },
});

// Clear all checked items from the list
export const clearCheckedItems = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const checkedItems = await ctx.db
      .query("groceryItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    for (const item of checkedItems) {
      if (item.checked) {
        await ctx.db.delete(item._id);
      }
    }
  },
});

// Clear all items from the list
export const clearAllItems = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const allItems = await ctx.db
      .query("groceryItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    for (const item of allItems) {
      await ctx.db.delete(item._id);
    }
  },
});
