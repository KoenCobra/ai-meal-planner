import { mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const createMenu = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("menus", {
      userId: args.userId,
      name: args.name,
    });
  },
});

export const updateMenu = mutation({
  args: {
    userId: v.string(),
    id: v.id("menus"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const menu = await ctx.db.get(args.id);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    await ctx.db.patch(args.id, { name: args.name });
    return args.id;
  },
});

export const deleteMenu = mutation({
  args: {
    userId: v.string(),
    id: v.id("menus"),
  },
  handler: async (ctx, args) => {
    const menu = await ctx.db.get(args.id);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    // Delete all recipe associations first
    const recipeAssociations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu", (q) => q.eq("menuId", args.id))
      .collect();

    for (const association of recipeAssociations) {
      await ctx.db.delete(association._id);
    }

    await ctx.db.delete(args.id);
  },
});

// Menu-Recipe Association Mutations
export const addRecipeToMenu = mutation({
  args: {
    userId: v.string(),
    menuId: v.id("menus"),
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    // Verify menu ownership
    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    // Verify recipe ownership
    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== args.userId) throw new ConvexError("Not authorized");

    // Check if recipe already exists in menu
    const existing = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu_and_recipe", (q) =>
        q.eq("menuId", args.menuId).eq("recipeId", args.recipeId),
      )
      .first();

    if (existing) return existing._id;

    // Add recipe to menu
    return await ctx.db.insert("menusOnRecipes", {
      menuId: args.menuId,
      recipeId: args.recipeId,
    });
  },
});

export const removeRecipeFromMenu = mutation({
  args: {
    userId: v.string(),
    menuId: v.id("menus"),
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    // Verify menu ownership
    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    const association = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu_and_recipe", (q) =>
        q.eq("menuId", args.menuId).eq("recipeId", args.recipeId),
      )
      .first();

    if (association) {
      await ctx.db.delete(association._id);
    }
  },
});

// Menu Queries
export const getMenu = query({
  args: {
    userId: v.string(),
    id: v.id("menus"),
  },
  handler: async (ctx, args) => {
    const menu = await ctx.db.get(args.id);

    if (!menu) throw new ConvexError("Menu not found");

    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    return menu;
  },
});

export const getMenus = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const menus = await ctx.db
      .query("menus")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    if (!menus) throw new ConvexError("Menus not found");

    return menus;
  },
});

export const getMenuRecipes = query({
  args: {
    userId: v.string(),
    menuId: v.id("menus"),
  },
  handler: async (ctx, args) => {
    // Verify menu ownership
    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu", (q) => q.eq("menuId", args.menuId))
      .order("desc")
      .collect();

    const recipes = await Promise.all(
      associations.map(async (assoc) => await ctx.db.get(assoc.recipeId)),
    );

    return recipes.filter(
      (recipe): recipe is NonNullable<typeof recipe> => recipe !== null,
    );
  },
});

export const getMenusContainingRecipe = query({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    // First get all menu-recipe associations for this recipe
    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.recipeId))
      .collect();

    // Get all menu IDs from the associations
    const menuIds = associations.map((assoc) => assoc.menuId);

    // Get all menus that match these IDs and belong to the user
    const menus = await Promise.all(
      menuIds.map(async (menuId) => {
        const menu = await ctx.db.get(menuId);
        if (menu && menu.userId === args.userId) {
          return menu;
        }
        return null;
      }),
    );

    // Filter out any null values and return the menus
    return menus.filter(
      (menu): menu is NonNullable<typeof menu> => menu !== null,
    );
  },
});

export const syncMenuIngredientsToGroceryList = mutation({
  args: {
    userId: v.string(),
    menuId: v.id("menus"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Verify menu ownership
    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    // Get all recipes in the menu
    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu", (q) => q.eq("menuId", args.menuId))
      .collect();

    // Get all recipes and their ingredients
    const recipes = await Promise.all(
      associations.map(async (assoc) => await ctx.db.get(assoc.recipeId)),
    );

    // Add all ingredients to the grocery list
    for (const recipe of recipes) {
      if (recipe) {
        for (const ingredient of recipe.ingredients) {
          await ctx.db.insert("groceryItems", {
            userId: args.userId,
            name: ingredient,
            checked: false,
          });
        }
      }
    }

    return null;
  },
});
