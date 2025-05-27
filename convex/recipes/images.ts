import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "../_generated/server";
import { rateLimiter } from "../rateLimiter";

export const generateUploadUrl = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx: MutationCtx, args) => {
    // Rate limit upload URL generation per user - this is an expensive operation
    await rateLimiter.limit(ctx, "generateUploadUrl", {
      key: args.userId,
      throws: true,
    });

    // Also check global file upload limit
    await rateLimiter.limit(ctx, "globalFileUploads", { throws: true });

    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx: QueryCtx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const updateRecipeImage = mutation({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx: MutationCtx, args) => {
    // Rate limit recipe image updates per user
    await rateLimiter.limit(ctx, "updateRecipeImage", {
      key: args.userId,
      throws: true,
    });

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) {
      throw new ConvexError("Recipe not found");
    }
    if (recipe.userId !== args.userId) {
      throw new ConvexError("Not authorized");
    }

    if (recipe.storageId) {
      await ctx.storage.delete(recipe.storageId);
    }

    await ctx.db.patch(args.recipeId, {
      storageId: args.storageId,
    });

    return args.storageId;
  },
});
