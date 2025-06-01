import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { addOrUpdateGroceryItem } from "./groceryList";
import { rateLimiter } from "./rateLimiter";

export const getRecipesByDishType = query({
  args: {
    userId: v.string(),
    dishType: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("recipes")
      .withIndex("by_user_and_dish_type", (q) =>
        q.eq("userId", args.userId).eq("dishType", args.dishType),
      )
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const createRecipe = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    summary: v.string(),
    servings: v.number(),
    readyInMinutes: v.number(),
    image: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
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
    const { userId, ...recipeData } = args;

    // Rate limit recipe creation per user
    await rateLimiter.limit(ctx, "createRecipe", { key: userId, throws: true });

    // Also check global recipe creation limit
    await rateLimiter.limit(ctx, "globalRecipeCreation", { throws: true });

    // Create searchable ingredients text
    const ingredientsText = recipeData.ingredients
      .map((ingredient) => ingredient.name)
      .join(" ");

    // Create combined search text for title and ingredients
    const searchText = `${recipeData.title} ${ingredientsText}`;

    return await ctx.db.insert("recipes", {
      userId,
      ...recipeData,
      ingredientsText,
      searchText,
    });
  },
});

export const updateRecipe = mutation({
  args: {
    userId: v.string(),
    id: v.id("recipes"),
    title: v.optional(v.string()),
    summary: v.optional(v.string()),
    servings: v.optional(v.number()),
    readyInMinutes: v.optional(v.number()),
    image: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    categories: v.optional(v.array(v.string())),
    instructions: v.optional(
      v.object({
        steps: v.array(
          v.object({
            number: v.number(),
            step: v.string(),
          }),
        ),
      }),
    ),
    ingredients: v.optional(
      v.array(
        v.object({
          name: v.string(),
          measures: v.object({
            amount: v.number(),
            unit: v.string(),
          }),
        }),
      ),
    ),
    ingredientsText: v.optional(v.string()),
    searchText: v.optional(v.string()),
    dishType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, userId, ...updates } = args;

    // Rate limit recipe updates per user
    await rateLimiter.limit(ctx, "updateRecipe", { key: userId, throws: true });

    const recipe = await ctx.db.get(id);
    if (!recipe) throw new Error("Recipe not found");
    if (recipe.userId !== userId) throw new Error("Not authorized");

    // Update search text if title or ingredients are being updated
    const finalUpdates = { ...updates };
    if (updates.ingredients || updates.title) {
      // Get current recipe to access existing values
      const currentTitle = updates.title || recipe.title;
      const currentIngredients = updates.ingredients || recipe.ingredients;

      finalUpdates.ingredientsText = currentIngredients
        .map((ingredient) => ingredient.name)
        .join(" ");

      finalUpdates.searchText = `${currentTitle} ${finalUpdates.ingredientsText}`;
    }

    await ctx.db.patch(id, finalUpdates);

    return id;
  },
});

export const deleteRecipe = mutation({
  args: {
    userId: v.string(),
    id: v.id("recipes"),
    dishType: v.string(),
  },
  handler: async (ctx, args) => {
    // Rate limit recipe deletion per user
    await rateLimiter.limit(ctx, "deleteRecipe", {
      key: args.userId,
      throws: true,
    });

    const recipe = await ctx.db.get(args.id);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== args.userId) throw new ConvexError("Not authorized");

    if (recipe.storageId) {
      await ctx.storage.delete(recipe.storageId);
    }

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
    userId: v.string(),
    id: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const recipe = await ctx.db.get(args.id);
    if (!recipe) return null;
    if (recipe.userId !== args.userId) throw new ConvexError("Not authorized");
    return recipe;
  },
});

export const listRecipes = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("recipes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const searchRecipesByTitleAndIngredients = query({
  args: {
    userId: v.string(),
    query: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    if (!args.query.trim()) {
      // If no query, return all recipes paginated
      return await ctx.db
        .query("recipes")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .order("desc")
        .paginate(args.paginationOpts);
    }

    // Search in combined title and ingredients text
    return await ctx.db
      .query("recipes")
      .withSearchIndex("search_recipes", (q) =>
        q.search("searchText", args.query).eq("userId", args.userId),
      )
      .paginate(args.paginationOpts);
  },
});

export const syncIngredientsToGroceryList = mutation({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Rate limit sync operations per user - these can be expensive
    await rateLimiter.limit(ctx, "syncRecipeIngredients", {
      key: args.userId,
      throws: true,
    });

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== args.userId) throw new ConvexError("Not authorized");

    for (const ingredient of recipe.ingredients) {
      const quantity = `${ingredient.measures.amount} ${ingredient.measures.unit}`;
      await addOrUpdateGroceryItem(ctx, args.userId, ingredient.name, quantity);
    }

    return null;
  },
});

export const updateRecipeImageUrl = mutation({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
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

    await ctx.db.patch(args.recipeId, {
      imageUrl: args.imageUrl,
    });

    return args.imageUrl;
  },
});
