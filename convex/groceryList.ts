import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query } from "./_generated/server";
import { rateLimiter } from "./rateLimiter";

export const addItem = mutation({
  args: {
    name: v.string(),
    unit: v.optional(v.string()),
    quantity: v.optional(v.number()),
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

    // Check if item with same name and unit already exists
    const existingItem = await ctx.db
      .query("groceryItems")
      .withIndex("by_user_name_and_unit", (q) =>
        q
          .eq("userId", userId)
          .eq("name", args.name.toLowerCase())
          .eq("unit", args.unit?.toLowerCase() || ""),
      )
      .first();

    if (existingItem && args.quantity && existingItem.quantity) {
      // Add quantities together if same name and unit
      const totalQuantity = existingItem.quantity + args.quantity;

      await ctx.db.patch(existingItem._id, {
        quantity: totalQuantity,
      });

      return existingItem._id;
    }

    return await ctx.db.insert("groceryItems", {
      userId,
      name: args.name.toLowerCase(),
      unit: args.unit?.toLowerCase() || "",
      quantity: args.quantity,
      checked: false,
    });
  },
});

export const addOrUpdateGroceryItem = async (
  ctx: MutationCtx,
  name: string,
  unit: string,
  quantity: number,
) => {
  const userId = (await ctx.auth.getUserIdentity())?.subject;
  if (!userId) {
    console.error("Unauthorized when adding or updating grocery item");
    throw new Error("Unauthorized when adding or updating grocery item");
  }

  // Check if item with same name and unit already exists
  const existingItem = await ctx.db
    .query("groceryItems")
    .withIndex("by_user_name_and_unit", (q) =>
      q
        .eq("userId", userId)
        .eq("name", name.toLowerCase())
        .eq("unit", unit.toLowerCase()),
    )
    .first();

  if (existingItem && existingItem.quantity) {
    // Add quantities together if same name and unit
    const totalQuantity = existingItem.quantity + quantity;

    await ctx.db.patch(existingItem._id, {
      quantity: totalQuantity,
    });

    return existingItem._id;
  }

  return await ctx.db.insert("groceryItems", {
    userId,
    name: name.toLowerCase(),
    unit: unit.toLowerCase(),
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
    // Use by_user index and order by creation time descending
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
