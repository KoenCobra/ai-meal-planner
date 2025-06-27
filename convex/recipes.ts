import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server";
import { addOrUpdateGroceryItem } from "./groceryList";
import { rateLimiter } from "./rateLimiter";

// Helper function to enrich a recipe with its image URL
async function enrichRecipeWithImageUrl(
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

// Helper function to enrich multiple recipes with their image URLs
async function enrichRecipesWithImageUrls(
  ctx: QueryCtx,
  recipes: Doc<"recipes">[],
): Promise<(Doc<"recipes"> & { imageUrl?: string })[]> {
  return Promise.all(
    recipes.map((recipe) => enrichRecipeWithImageUrl(ctx, recipe)),
  );
}

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const getRecipesByDishType = query({
  args: {
    dishType: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when getting recipes by dish type");
      throw new Error("Unauthorized when getting recipes by dish type");
    }

    const result = await ctx.db
      .query("recipes")
      .withIndex("by_user_and_dish_type", (q) =>
        q.eq("userId", userId).eq("dishType", args.dishType),
      )
      .order("desc")
      .paginate(args.paginationOpts);

    // Enrich recipes with image URLs
    const enrichedRecipes = await enrichRecipesWithImageUrls(ctx, result.page);

    return {
      ...result,
      page: enrichedRecipes,
    };
  },
});

export const createRecipe = mutation({
  args: {
    title: v.string(),
    summary: v.string(),
    servings: v.number(),
    readyInMinutes: v.number(),
    imageId: v.optional(v.id("_storage")),
    blurDataURL: v.optional(v.string()),
    categories: v.array(v.string()),
    instructions: v.object({
      steps: v.array(
        v.object({
          number: v.number(),
          step: v.string(),
        }),
      ),
    }),
    ingredients: v.array(
      v.object({
        name: v.string(),
        measures: v.object({
          amount: v.number(),
          unit: v.string(),
        }),
      }),
    ),
    dishType: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when creating recipe");
      throw new Error("Unauthorized when creating recipe");
    }

    const { ...recipeData } = args;

    await rateLimiter.limit(ctx, "createRecipe", { key: userId, throws: true });

    const ingredientsText = recipeData.ingredients
      .map((ingredient) => ingredient.name)
      .join(" ");

    const categoriesText = recipeData.categories.join(" ");

    const searchText = `${recipeData.title} ${ingredientsText} ${categoriesText}`;

    return await ctx.db.insert("recipes", {
      userId,
      ...recipeData,
      ingredientsText,
      searchText,
    });
  },
});

export const deleteRecipe = mutation({
  args: {
    id: v.id("recipes"),
    dishType: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when deleting recipe");
      throw new Error("Unauthorized when deleting recipe");
    }

    await rateLimiter.limit(ctx, "deleteRecipe", {
      key: userId,
      throws: true,
    });

    const recipe = await ctx.db.get(args.id);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== userId) throw new ConvexError("Not authorized");

    const menuAssociations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.id))
      .collect();

    for (const association of menuAssociations) {
      await ctx.db.delete(association._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const getRecipe = query({
  args: {
    id: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when getting recipe");
      throw new Error("Unauthorized when getting recipe");
    }
    const recipe = await ctx.db.get(args.id);
    if (!recipe) return null;
    if (recipe.userId !== userId) throw new ConvexError("Not authorized");

    // Enrich recipe with image URL
    return await enrichRecipeWithImageUrl(ctx, recipe);
  },
});

export const listRecipes = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when listing recipes");
      throw new Error("Unauthorized when listing recipes");
    }
    const result = await ctx.db
      .query("recipes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .paginate(args.paginationOpts);

    // Enrich recipes with image URLs
    const enrichedRecipes = await enrichRecipesWithImageUrls(ctx, result.page);

    return {
      ...result,
      page: enrichedRecipes,
    };
  },
});

export const searchRecipesByTitleIngredientsAndCategories = query({
  args: {
    query: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error(
        "Unauthorized when searching recipes by title ingredients and categories",
      );
      throw new Error(
        "Unauthorized when searching recipes by title ingredients and categories",
      );
    }

    let result;
    if (!args.query.trim()) {
      result = await ctx.db
        .query("recipes")
        .withIndex("by_user", (q) => q.eq("userId", userId))
        .order("desc")
        .paginate(args.paginationOpts);
    } else {
      result = await ctx.db
        .query("recipes")
        .withSearchIndex("search_recipes", (q) =>
          q.search("searchText", args.query).eq("userId", userId),
        )
        .paginate(args.paginationOpts);
    }

    // Enrich recipes with image URLs
    const enrichedRecipes = await enrichRecipesWithImageUrls(ctx, result.page);

    return {
      ...result,
      page: enrichedRecipes,
    };
  },
});

export const syncIngredientsToGroceryList = mutation({
  args: {
    recipeId: v.id("recipes"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when syncing ingredients to grocery list");
      throw new Error("Unauthorized when syncing ingredients to grocery list");
    }

    await rateLimiter.limit(ctx, "syncRecipeIngredients", {
      key: userId,
      throws: true,
    });

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== userId) throw new ConvexError("Not authorized");

    for (const ingredient of recipe.ingredients) {
      await addOrUpdateGroceryItem(
        ctx,
        ingredient.name,
        ingredient.measures.unit,
        ingredient.measures.amount,
      );
    }

    return null;
  },
});
