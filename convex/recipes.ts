import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const createRecipe = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    summary: v.string(),
    servings: v.number(),
    readyInMinutes: v.number(),
    image: v.optional(v.string()),
    diets: v.array(v.string()),
    instructions: v.string(),
    ingredients: v.array(v.string()),
    dishTypes: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...recipeData } = args;
    return await ctx.db.insert("recipes", {
      userId,
      ...recipeData,
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
    diets: v.optional(v.array(v.string())),
    instructions: v.optional(v.string()),
    ingredients: v.optional(v.array(v.string())),
    dishTypes: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, userId, ...updates } = args;
    const recipe = await ctx.db.get(id);
    if (!recipe) throw new Error("Recipe not found");
    if (recipe.userId !== userId) throw new Error("Not authorized");

    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteRecipe = mutation({
  args: {
    userId: v.string(),
    id: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const recipe = await ctx.db.get(args.id);
    if (!recipe) throw new Error("Recipe not found");
    if (recipe.userId !== args.userId) throw new Error("Not authorized");

    // Delete all menu associations
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

// Recipe Queries
export const getRecipe = query({
  args: {
    userId: v.string(),
    id: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const recipe = await ctx.db.get(args.id);
    if (!recipe) return null;
    if (recipe.userId !== args.userId) throw new Error("Not authorized");
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

export const searchRecipes = query({
  args: {
    userId: v.string(),
    query: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("recipes")
      .withSearchIndex("search_title", (q) =>
        q.search("title", args.query).eq("userId", args.userId),
      )
      .paginate(args.paginationOpts);
  },
});

export const searchByIngredients = query({
  args: {
    userId: v.string(),
    query: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("recipes")
      .withSearchIndex("search_ingredients", (q) =>
        q.search("ingredients", args.query).eq("userId", args.userId),
      )
      .paginate(args.paginationOpts);
  },
});
