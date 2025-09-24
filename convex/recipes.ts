import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { addOrUpdateGroceryItem } from "./groceryList";
import { getAuthenticatedUserId } from "./lib/auth";
import {
  enrichRecipesWithImageUrls,
  enrichRecipeWithImageUrl,
} from "./lib/imageUtils";
import { rateLimiter } from "./rateLimiter";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await getAuthenticatedUserId(ctx, "generating upload URL");
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

    // Delete menu associations
    const menuAssociations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.id))
      .collect();

    for (const association of menuAssociations) {
      await ctx.db.delete(association._id);
    }

    // Delete nutritional values
    const nutritionalValues = await ctx.db
      .query("nutritionalValues")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.id))
      .collect();

    for (const nutrition of nutritionalValues) {
      await ctx.db.delete(nutrition._id);
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

export const saveNutritionalValues = mutation({
  args: {
    recipeId: v.id("recipes"),
    calories: v.optional(v.number()),
    protein: v.optional(v.number()),
    totalFat: v.optional(v.number()),
    saturatedFat: v.optional(v.number()),
    unsaturatedFat: v.optional(v.number()),
    totalCarbohydrates: v.optional(v.number()),
    sugars: v.optional(v.number()),
    cholesterol: v.optional(v.number()),
    sodium: v.optional(v.number()),
    fiber: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when saving nutritional values");
      throw new Error("Unauthorized when saving nutritional values");
    }

    await rateLimiter.limit(ctx, "createRecipe", {
      key: userId,
      throws: true,
    });

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== userId) throw new ConvexError("Not authorized");

    return await ctx.db.insert("nutritionalValues", {
      recipeId: args.recipeId,
      calories: args.calories,
      protein: args.protein,
      totalFat: args.totalFat,
      saturatedFat: args.saturatedFat,
      unsaturatedFat: args.unsaturatedFat,
      totalCarbohydrates: args.totalCarbohydrates,
      sugars: args.sugars,
      cholesterol: args.cholesterol,
      sodium: args.sodium,
      fiber: args.fiber,
    });
  },
});

export const getNutritionalValues = query({
  args: {
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when getting nutritional values");
      throw new Error("Unauthorized when getting nutritional values");
    }

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== userId) throw new ConvexError("Not authorized");

    const nutritionalValues = await ctx.db
      .query("nutritionalValues")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.recipeId))
      .first();

    return nutritionalValues;
  },
});
