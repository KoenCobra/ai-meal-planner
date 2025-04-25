import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

// Add a new item to the grocery list
export const addItem = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    quantity: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("groceryItems", {
      userId: args.userId,
      name: args.name,
      quantity: args.quantity,
      checked: false,
    });
  },
});

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
    if (args.name !== undefined) updates.name = args.name;
    if (args.quantity !== undefined) updates.quantity = args.quantity;

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
    return ctx.db
      .query("groceryItems")
      .withSearchIndex("search_name", (q) =>
        q.search("name", args.query).eq("userId", args.userId),
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
