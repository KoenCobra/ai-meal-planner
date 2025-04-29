import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx) => {
    // Validate user exists (optional but good practice)
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const updateRecipeImage = mutation({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) {
      throw new ConvexError("Recipe not found");
    }
    if (recipe.userId !== args.userId) {
      throw new ConvexError("Not authorized");
    }

    // If there's an existing image, delete it
    if (recipe.storageId) {
      await ctx.storage.delete(recipe.storageId);
    }

    // Update the recipe with the new storage ID
    await ctx.db.patch(args.recipeId, {
      storageId: args.storageId,
    });

    return args.storageId;
  },
});
