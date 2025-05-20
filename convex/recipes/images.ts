import { ConvexError, v } from "convex/values";
import { sanitizeStringServer } from "../../lib/utils";
import { mutation, MutationCtx, query, QueryCtx } from "../_generated/server";

export const generateUploadUrl = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx: MutationCtx) => {
    // Validate user exists (optional but good practice)
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx: QueryCtx, args) => {
    console.log("Getting image URL for storage ID:", args.storageId);
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
    // Sanitize any user-provided IDs (though these should already be validated by the validators)
    const sanitizedUserId = sanitizeStringServer(args.userId);

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) {
      throw new ConvexError("Recipe not found");
    }
    if (recipe.userId !== sanitizedUserId) {
      throw new ConvexError("Not authorized");
    }

    console.log("Updating recipe image:", args.storageId);

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
