import { Doc } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

/**
 * Enrich a recipe with its image URL
 */
export async function enrichRecipeWithImageUrl(
  ctx: QueryCtx,
  recipe: Doc<"recipes">,
): Promise<Doc<"recipes"> & { imageUrl?: string }> {
  if (!recipe.imageId) {
    return recipe;
  }

  const imageUrl = await ctx.storage.getUrl(recipe.imageId);
  return {
    ...recipe,
    imageUrl: imageUrl || undefined,
  };
}

/**
 * Enrich multiple recipes with their image URLs
 */
export async function enrichRecipesWithImageUrls(
  ctx: QueryCtx,
  recipes: Doc<"recipes">[],
): Promise<(Doc<"recipes"> & { imageUrl?: string })[]> {
  return Promise.all(
    recipes.map((recipe) => enrichRecipeWithImageUrl(ctx, recipe)),
  );
}
