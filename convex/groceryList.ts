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
    name: v.string(),
    quantity: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when adding grocery item");
      throw new Error("Unauthorized when adding grocery item");
    }
    await rateLimiter.limit(ctx, "addGroceryItem", {
      key: userId,
      throws: true,
    });

    const existingItem = await ctx.db
      .query("groceryItems")
      .withIndex("by_user_and_name", (q) =>
        q.eq("userId", userId).eq("name", args.name),
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
      userId,
      name: args.name,
      quantity: args.quantity,
      checked: false,
    });
  },
});

export const addOrUpdateGroceryItem = async (
  ctx: MutationCtx,
  name: string,
  quantity: string,
) => {
  const userId = (await ctx.auth.getUserIdentity())?.subject;
  if (!userId) {
    console.error("Unauthorized when adding or updating grocery item");
    throw new Error("Unauthorized when adding or updating grocery item");
  }

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
    id: v.id("groceryItems"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when toggling grocery item");
      throw new Error("Unauthorized when toggling grocery item");
    }

    await rateLimiter.limit(ctx, "toggleGroceryItem", {
      key: userId,
      throws: true,
    });

    const item = await ctx.db.get(args.id);
    if (!item) throw new ConvexError("Item not found");
    if (item.userId !== userId) throw new ConvexError("Not authorized");

    await ctx.db.patch(args.id, { checked: !item.checked });
  },
});

export const listItems = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when listing grocery items");
      throw new Error("Unauthorized when listing grocery items");
    }
    return await ctx.db
      .query("groceryItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const clearAllItems = mutation({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when clearing all grocery items");
      throw new Error("Unauthorized when clearing all grocery items");
    }
    await rateLimiter.limit(ctx, "clearAllGroceryItems", {
      key: userId,
      throws: true,
    });

    const allItems = await ctx.db
      .query("groceryItems")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    for (const item of allItems) {
      await ctx.db.delete(item._id);
    }
  },
});
