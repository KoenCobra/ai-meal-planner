import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

// Recipe Mutations
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
    const recipeId = await ctx.db.insert("recipes", {
      userId: args.userId,
      title: args.title,
      summary: args.summary,
      servings: args.servings,
      readyInMinutes: args.readyInMinutes,
      image: args.image,
      diets: args.diets,
      instructions: args.instructions,
      ingredients: args.ingredients,
      dishTypes: args.dishTypes,
    });
    return recipeId;
  },
});

export const updateRecipe = mutation({
  args: {
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
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteRecipe = mutation({
  args: {
    id: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    // First delete all menu associations
    const menuAssociations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.id))
      .collect();

    for (const association of menuAssociations) {
      await ctx.db.delete(association._id);
    }

    // Then delete the recipe
    await ctx.db.delete(args.id);
  },
});

// Menu Mutations
export const createMenu = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const menuId = await ctx.db.insert("menus", {
      userId: args.userId,
      name: args.name,
    });
    return menuId;
  },
});

export const updateMenu = mutation({
  args: {
    id: v.id("menus"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { name: args.name });
    return args.id;
  },
});

export const deleteMenu = mutation({
  args: {
    id: v.id("menus"),
  },
  handler: async (ctx, args) => {
    // First delete all recipe associations
    const recipeAssociations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu", (q) => q.eq("menuId", args.id))
      .collect();

    for (const association of recipeAssociations) {
      await ctx.db.delete(association._id);
    }

    // Then delete the menu
    await ctx.db.delete(args.id);
  },
});

// Menu-Recipe Association Mutations
export const addRecipeToMenu = mutation({
  args: {
    menuId: v.id("menus"),
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    // Check if recipe exists in menu
    const existing = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu_and_recipe", (q) =>
        q.eq("menuId", args.menuId).eq("recipeId", args.recipeId),
      )
      .unique();

    if (existing) {
      return existing._id;
    }

    // Add recipe to menu
    const id = await ctx.db.insert("menusOnRecipes", {
      menuId: args.menuId,
      recipeId: args.recipeId,
    });
    return id;
  },
});

export const removeRecipeFromMenu = mutation({
  args: {
    menuId: v.id("menus"),
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const association = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu_and_recipe", (q) =>
        q.eq("menuId", args.menuId).eq("recipeId", args.recipeId),
      )
      .unique();

    if (association) {
      await ctx.db.delete(association._id);
    }
  },
});

// Queries
export const getRecipe = query({
  args: { id: v.id("recipes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getUserRecipes = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("recipes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const searchRecipesByTitle = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("recipes")
      .withIndex("by_title")
      .filter(
        (q) =>
          q.gte(q.field("title"), args.searchTerm) &&
          q.lt(q.field("title"), args.searchTerm + "\uffff"),
      )
      .collect();
  },
});

export const getMenu = query({
  args: { id: v.id("menus") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getUserMenus = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("menus")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getMenuRecipes = query({
  args: { menuId: v.id("menus") },
  handler: async (ctx, args) => {
    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu", (q) => q.eq("menuId", args.menuId))
      .collect();

    const recipes = await Promise.all(
      associations.map((assoc) => ctx.db.get(assoc.recipeId)),
    );

    return recipes.filter(
      (recipe): recipe is Doc<"recipes"> => recipe !== null,
    );
  },
});
