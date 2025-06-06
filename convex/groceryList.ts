import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query } from "./_generated/server";
import { rateLimiter } from "./rateLimiter";

export const parseQuantity = (
  quantityStr: string,
): { amount: number; unit: string } | null => {
  const match = quantityStr.trim().match(/^([\d.]+)\s*(.*)$/);
  if (!match) return null;

  const amount = parseFloat(match[1]);
  const unit = match[2].trim();

  if (isNaN(amount)) return null;
  return { amount, unit };
};

export const addItem = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    quantity: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "addGroceryItem", {
      key: args.userId,
      throws: true,
    });

    const existingItem = await ctx.db
      .query("groceryItems")
      .withIndex("by_user_and_name", (q) =>
        q.eq("userId", args.userId).eq("name", args.name),
      )
      .first();

    if (existingItem && args.quantity && existingItem.quantity) {
      const newQuantity = parseQuantity(args.quantity);
      const existingQuantity = parseQuantity(existingItem.quantity);

      if (
        newQuantity &&
        existingQuantity &&
        newQuantity.unit === existingQuantity.unit
      ) {
        const totalAmount = newQuantity.amount + existingQuantity.amount;
        const updatedQuantity = `${totalAmount} ${newQuantity.unit}`;

        await ctx.db.patch(existingItem._id, {
          quantity: updatedQuantity,
        });

        return existingItem._id;
      }
    }

    return await ctx.db.insert("groceryItems", {
      userId: args.userId,
      name: args.name,
      quantity: args.quantity,
      checked: false,
    });
  },
});

export const addOrUpdateGroceryItem = async (
  ctx: MutationCtx,
  userId: string,
  name: string,
  quantity: string,
) => {
  const existingItem = await ctx.db
    .query("groceryItems")
    .withIndex("by_user_and_name", (q) =>
      q.eq("userId", userId).eq("name", name),
    )
    .first();

  if (existingItem && existingItem.quantity) {
    const newQuantity = parseQuantity(quantity);
    const existingQuantity = parseQuantity(existingItem.quantity);

    if (
      newQuantity &&
      existingQuantity &&
      newQuantity.unit === existingQuantity.unit
    ) {
      const totalAmount = newQuantity.amount + existingQuantity.amount;
      const updatedQuantity = `${totalAmount} ${newQuantity.unit}`;

      await ctx.db.patch(existingItem._id, {
        quantity: updatedQuantity,
      });

      return existingItem._id;
    }
  }

  return await ctx.db.insert("groceryItems", {
    userId,
    name,
    quantity,
    checked: false,
  });
};

export const toggleItem = mutation({
  args: {
    userId: v.string(),
    id: v.id("groceryItems"),
  },
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "toggleGroceryItem", {
      key: args.userId,
      throws: true,
    });

    const item = await ctx.db.get(args.id);
    if (!item) throw new ConvexError("Item not found");
    if (item.userId !== args.userId) throw new ConvexError("Not authorized");

    await ctx.db.patch(args.id, { checked: !item.checked });
  },
});

export const listItems = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("groceryItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const clearAllItems = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "clearAllGroceryItems", {
      key: args.userId,
      throws: true,
    });

    const allItems = await ctx.db
      .query("groceryItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    for (const item of allItems) {
      await ctx.db.delete(item._id);
    }
  },
});
