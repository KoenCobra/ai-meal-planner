import { v } from "convex/values";
import { mutation, MutationCtx, query } from "./_generated/server";
import { getAuthenticatedUserId } from "./lib/auth";
import * as GroceryItemsModel from "./model/groceryItems";
import { rateLimiter } from "./rateLimiter";

export const addItem = mutation({
  args: {
    name: v.string(),
    unit: v.optional(v.string()),
    quantity: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthenticatedUserId(ctx, "adding grocery item");

    await rateLimiter.limit(ctx, "addGroceryItem", {
      key: userId,
      throws: true,
    });

    return await GroceryItemsModel.addOrUpdateGroceryItem(
      ctx,
      userId,
      args.name,
      args.unit || "",
      args.quantity || 0,
    );
  },
});

export const addOrUpdateGroceryItem = async (
  ctx: MutationCtx,
  name: string,
  unit: string,
  quantity: number,
) => {
  const userId = await getAuthenticatedUserId(
    ctx,
    "adding or updating grocery item",
  );
  return await GroceryItemsModel.addOrUpdateGroceryItem(
    ctx,
    userId,
    name,
    unit,
    quantity,
  );
};

export const toggleItem = mutation({
  args: {
    id: v.id("groceryItems"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthenticatedUserId(ctx, "toggling grocery item");

    await rateLimiter.limit(ctx, "toggleGroceryItem", {
      key: userId,
      throws: true,
    });

    await GroceryItemsModel.toggleGroceryItem(ctx, userId, args.id);
  },
});

export const listItems = query({
  handler: async (ctx) => {
    const userId = await getAuthenticatedUserId(ctx, "listing grocery items");
    return await GroceryItemsModel.getUserGroceryItems(ctx, userId);
  },
});

export const clearAllItems = mutation({
  handler: async (ctx) => {
    const userId = await getAuthenticatedUserId(
      ctx,
      "clearing all grocery items",
    );

    await rateLimiter.limit(ctx, "clearAllGroceryItems", {
      key: userId,
      throws: true,
    });

    await GroceryItemsModel.clearAllUserGroceryItems(ctx, userId);
  },
});
