import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { addOrUpdateGroceryItem } from "./groceryList";

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

export const addRecipeToMenu = mutation({
  args: {
    userId: v.string(),
    menuId: v.id("menus"),
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== args.userId) throw new ConvexError("Not authorized");

    const existing = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu_and_recipe", (q) =>
        q.eq("menuId", args.menuId).eq("recipeId", args.recipeId),
      )
      .first();

    if (existing) return existing._id;

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
    paginationOpts: v.optional(paginationOptsValidator),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("menus")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .paginate(args.paginationOpts || { numItems: 10, cursor: null });
  },
});

export const getMenuRecipes = query({
  args: {
    userId: v.string(),
    menuId: v.id("menus"),
    paginationOpts: v.optional(paginationOptsValidator),
  },
  handler: async (ctx, args) => {
    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu", (q) => q.eq("menuId", args.menuId))
      .order("desc")
      .paginate(args.paginationOpts || { numItems: 10, cursor: null });

    const recipes = await Promise.all(
      associations.page.map(async (assoc) => await ctx.db.get(assoc.recipeId)),
    );

    return {
      page: recipes.filter(
        (recipe): recipe is NonNullable<typeof recipe> => recipe !== null,
      ),
      isDone: associations.isDone,
      continueCursor: associations.continueCursor,
    };
  },
});

export const getMenusContainingRecipe = query({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
    paginationOpts: v.optional(paginationOptsValidator),
  },
  handler: async (ctx, args) => {
    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.recipeId))
      .paginate(args.paginationOpts || { numItems: 10, cursor: null });

    const menuIds = associations.page.map((assoc) => assoc.menuId);

    const menus = await Promise.all(
      menuIds.map(async (menuId) => {
        const menu = await ctx.db.get(menuId);
        if (menu && menu.userId === args.userId) {
          return menu;
        }
        return null;
      }),
    );

    return {
      page: menus.filter(
        (menu): menu is NonNullable<typeof menu> => menu !== null,
      ),
      isDone: associations.isDone,
      continueCursor: associations.continueCursor,
    };
  },
});

export const syncMenuIngredientsToGroceryList = mutation({
  args: {
    userId: v.string(),
    menuId: v.id("menus"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== args.userId) throw new ConvexError("Not authorized");

    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu", (q) => q.eq("menuId", args.menuId))
      .collect();

    const recipes = await Promise.all(
      associations.map(async (assoc) => await ctx.db.get(assoc.recipeId)),
    );

    for (const recipe of recipes) {
      if (recipe) {
        for (const ingredient of recipe.ingredients) {
          const quantity = `${ingredient.measures.amount} ${ingredient.measures.unit}`;
          await addOrUpdateGroceryItem(
            ctx,
            args.userId,
            ingredient.name,
            quantity,
          );
        }
      }
    }

    return null;
  },
});
