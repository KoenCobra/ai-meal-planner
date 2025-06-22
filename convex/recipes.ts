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
    const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!user) {
      throw new Error("Unauthorized");
    }

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
    imageUrl: v.string(),
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
    const { userId, ...recipeData } = args;

    const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!user) {
      throw new Error("Unauthorized");
    }

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
    userId: v.string(),
    id: v.id("recipes"),
    dishType: v.string(),
  },
  handler: async (ctx, args) => {
    const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!user) {
      throw new Error("Unauthorized");
    }

    await rateLimiter.limit(ctx, "deleteRecipe", {
      key: args.userId,
      throws: true,
    });

    const recipe = await ctx.db.get(args.id);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== args.userId) throw new ConvexError("Not authorized");

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
    const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!user) {
      throw new Error("Unauthorized");
    }
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
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }
    return await ctx.db
      .query("recipes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const searchRecipesByTitleIngredientsAndCategories = query({
  args: {
    userId: v.string(),
    query: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }

    if (!args.query.trim()) {
      return await ctx.db
        .query("recipes")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .order("desc")
        .paginate(args.paginationOpts);
    }

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
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthorized");
    }
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
