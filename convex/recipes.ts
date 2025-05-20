"use server";

import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { sanitizeStringServer } from "../lib/utils";
import { mutation, query } from "./_generated/server";
import { addOrUpdateGroceryItem } from "./groceryList";

// Define types for recipe data
type RecipeIngredient = {
  name: string;
  measures: {
    amount: number;
    unit: string;
  };
};

type RecipeStep = {
  number: number;
  step: string;
};

type RecipeInstructions = {
  name: string;
  steps: RecipeStep[];
};

// Base type with all fields optional for updates
type RecipeDataPartial = {
  title?: string;
  summary?: string;
  servings?: number;
  readyInMinutes?: number;
  image?: string;
  diets?: string[];
  instructions?: RecipeInstructions;
  ingredients?: RecipeIngredient[];
  dishTypes?: string[];
};

// Full recipe data for creation with required fields
type RecipeDataFull = {
  title: string;
  summary: string;
  servings: number;
  readyInMinutes: number;
  image?: string;
  diets: string[];
  instructions: RecipeInstructions;
  ingredients: RecipeIngredient[];
  dishTypes: string[];
};

// Helper function to sanitize recipe data
const sanitizeRecipeData = <T extends RecipeDataPartial>(recipeData: T): T => {
  const sanitized = { ...recipeData };

  // Sanitize strings
  if (sanitized.title) sanitized.title = sanitizeStringServer(sanitized.title);
  if (sanitized.summary)
    sanitized.summary = sanitizeStringServer(sanitized.summary);

  // Sanitize arrays of strings
  if (sanitized.diets) {
    sanitized.diets = sanitized.diets.map((diet) => sanitizeStringServer(diet));
  }

  if (sanitized.dishTypes) {
    sanitized.dishTypes = sanitized.dishTypes.map((type) =>
      sanitizeStringServer(type),
    );
  }

  // Sanitize nested objects
  if (sanitized.instructions) {
    sanitized.instructions = {
      name: sanitizeStringServer(sanitized.instructions.name),
      steps: sanitized.instructions.steps.map((step) => ({
        number: step.number,
        step: sanitizeStringServer(step.step),
      })),
    };
  }

  // Sanitize ingredients
  if (sanitized.ingredients) {
    sanitized.ingredients = sanitized.ingredients.map((ingredient) => ({
      name: sanitizeStringServer(ingredient.name),
      measures: {
        amount: ingredient.measures.amount,
        unit: sanitizeStringServer(ingredient.measures.unit),
      },
    }));
  }

  return sanitized;
};

export const createRecipe = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    summary: v.string(),
    servings: v.number(),
    readyInMinutes: v.number(),
    image: v.optional(v.string()),
    diets: v.array(v.string()),
    instructions: v.object({
      name: v.string(),
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
    dishTypes: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...recipeData } = args;

    // Sanitize all string inputs in the recipe data
    const sanitizedData = sanitizeRecipeData(recipeData as RecipeDataFull);

    return await ctx.db.insert("recipes", {
      userId,
      ...sanitizedData,
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
    instructions: v.optional(
      v.object({
        name: v.string(),
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
    dishTypes: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, userId, ...updates } = args;
    const recipe = await ctx.db.get(id);
    if (!recipe) throw new Error("Recipe not found");
    if (recipe.userId !== userId) throw new Error("Not authorized");

    // Sanitize all string inputs in the updates
    const sanitizedUpdates = sanitizeRecipeData(updates);

    await ctx.db.patch(id, sanitizedUpdates);
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
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== args.userId) throw new ConvexError("Not authorized");

    // Delete the image from storage if it exists
    if (recipe.storageId) {
      await ctx.storage.delete(recipe.storageId);
    }

    // Delete all menu associations first
    const menuAssociations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.id))
      .collect();

    for (const association of menuAssociations) {
      await ctx.db.delete(association._id);
    }

    // Delete the recipe
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
    // Sanitize search query
    const sanitizedQuery = sanitizeStringServer(args.query);

    return await ctx.db
      .query("recipes")
      .withSearchIndex("search_title", (q) =>
        q.search("title", sanitizedQuery).eq("userId", args.userId),
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
    // Sanitize search query
    const sanitizedQuery = sanitizeStringServer(args.query);

    return await ctx.db
      .query("recipes")
      .withSearchIndex("search_ingredients", (q) =>
        q.search("ingredients", sanitizedQuery).eq("userId", args.userId),
      )
      .paginate(args.paginationOpts);
  },
});

export const getAllRecipes = query({
  args: {
    userId: v.string(),
    paginationOpts: v.optional(paginationOptsValidator),
  },
  handler: async (ctx, args) => {
    console.log("Getting all recipes for user:", args.userId);
    return await ctx.db
      .query("recipes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .paginate(args.paginationOpts || { numItems: 10, cursor: null });
  },
});

export const syncIngredientsToGroceryList = mutation({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Get the recipe
    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== args.userId) throw new ConvexError("Not authorized");

    // Add each ingredient to the grocery list using the helper function
    for (const ingredient of recipe.ingredients) {
      const quantity = `${ingredient.measures.amount} ${ingredient.measures.unit}`;
      await addOrUpdateGroceryItem(ctx, args.userId, ingredient.name, quantity);
    }

    return null;
  },
});
