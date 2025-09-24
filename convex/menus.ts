import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { addOrUpdateGroceryItem } from "./groceryList";
import { getAuthenticatedUserId } from "./lib/auth";
import { enrichRecipesWithImageUrls } from "./lib/imageUtils";
import { rateLimiter } from "./rateLimiter";

export const createMenu = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthenticatedUserId(ctx, "creating menu");

    await rateLimiter.limit(ctx, "createMenu", {
      key: userId,
      throws: true,
    });

    return await ctx.db.insert("menus", {
      userId,
      name: args.name,
    });
  },
});

export const updateMenu = mutation({
  args: {
    id: v.id("menus"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when updating menu");
      throw new Error("Unauthorized when updating menu");
    }
    await rateLimiter.limit(ctx, "updateMenu", {
      key: userId,
      throws: true,
    });

    const menu = await ctx.db.get(args.id);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== userId) throw new ConvexError("Not authorized");

    await ctx.db.patch(args.id, { name: args.name });

    return args.id;
  },
});

export const deleteMenu = mutation({
  args: {
    id: v.id("menus"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when deleting menu");
      throw new Error("Unauthorized when deleting menu");
    }
    await rateLimiter.limit(ctx, "deleteMenu", {
      key: userId,
      throws: true,
    });

    const menu = await ctx.db.get(args.id);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== userId) throw new ConvexError("Not authorized");

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

export const removeRecipeFromMenu = mutation({
  args: {
    menuId: v.id("menus"),
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when removing recipe from menu");
      throw new Error("Unauthorized when removing recipe from menu");
    }
    await rateLimiter.limit(ctx, "removeRecipeFromMenu", {
      key: userId,
      throws: true,
    });

    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== userId) throw new ConvexError("Not authorized");

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
    id: v.id("menus"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when getting menu");
      throw new Error("Unauthorized when getting menu");
    }

    const menu = await ctx.db.get(args.id);

    if (!menu) throw new ConvexError("Menu not found");

    if (menu.userId !== userId) throw new ConvexError("Not authorized");

    return menu;
  },
});

export const getMenus = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when getting menus");
      throw new Error("Unauthorized when getting menus");
    }

    return ctx.db
      .query("menus")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getMenuRecipes = query({
  args: {
    menuId: v.id("menus"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when getting menu recipes");
      throw new Error("Unauthorized when getting menu recipes");
    }

    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== userId) throw new ConvexError("Not authorized");

    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu", (q) => q.eq("menuId", args.menuId))
      .order("desc")
      .collect();

    const recipes = await Promise.all(
      associations.map(async (assoc) => await ctx.db.get(assoc.recipeId)),
    );

    const validRecipes = recipes.filter(
      (recipe): recipe is NonNullable<typeof recipe> => recipe !== null,
    );

    // Enrich recipes with image URLs
    return await enrichRecipesWithImageUrls(ctx, validRecipes);
  },
});

// Optimized single function to get menu recipes by dish type
export const getMenuRecipesByDishType = query({
  args: {
    menuId: v.id("menus"),
    dishType: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when getting menu recipes by dish type");
      throw new Error("Unauthorized when getting menu recipes by dish type");
    }

    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== userId) throw new ConvexError("Not authorized");

    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_menu", (q) => q.eq("menuId", args.menuId))
      .order("desc")
      .paginate(args.paginationOpts);

    const recipes = await Promise.all(
      associations.page.map(async (assoc) => await ctx.db.get(assoc.recipeId)),
    );

    const filteredRecipes = recipes.filter(
      (recipe): recipe is NonNullable<typeof recipe> =>
        recipe !== null && recipe.dishType === args.dishType,
    );

    // Enrich recipes with image URLs
    const enrichedRecipes = await enrichRecipesWithImageUrls(
      ctx,
      filteredRecipes,
    );

    return {
      page: enrichedRecipes,
      isDone: associations.isDone,
      continueCursor: associations.continueCursor,
    };
  },
});

export const getMenusContainingRecipe = query({
  args: {
    recipeId: v.id("recipes"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when getting menus containing recipe");
      throw new Error("Unauthorized when getting menus containing recipe");
    }

    const associations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.recipeId))
      .collect();

    const menuIds = associations.map((assoc) => assoc.menuId);

    const menus = await Promise.all(
      menuIds.map(async (menuId) => {
        const menu = await ctx.db.get(menuId);
        if (menu && menu.userId === userId) {
          return menu;
        }
        return null;
      }),
    );

    return menus.filter(
      (menu): menu is NonNullable<typeof menu> => menu !== null,
    );
  },
});

export const syncMenuIngredientsToGroceryList = mutation({
  args: {
    menuId: v.id("menus"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error(
        "Unauthorized when syncing menu ingredients to grocery list",
      );
      throw new Error(
        "Unauthorized when syncing menu ingredients to grocery list",
      );
    }
    await rateLimiter.limit(ctx, "syncMenuIngredients", {
      key: userId,
      throws: true,
    });

    const menu = await ctx.db.get(args.menuId);
    if (!menu) throw new ConvexError("Menu not found");
    if (menu.userId !== userId) throw new ConvexError("Not authorized");

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
          await addOrUpdateGroceryItem(
            ctx,
            ingredient.name,
            ingredient.measures.unit,
            ingredient.measures.amount,
          );
        }
      }
    }

    return null;
  },
});

export const setRecipeMenuAssociations = mutation({
  args: {
    recipeId: v.id("recipes"),
    menuIds: v.array(v.id("menus")),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when setting recipe menu associations");
      throw new Error("Unauthorized when setting recipe menu associations");
    }
    await rateLimiter.limit(ctx, "addRecipeToMenu", {
      key: userId,
      throws: true,
    });

    // Verify recipe ownership
    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) throw new ConvexError("Recipe not found");
    if (recipe.userId !== userId) throw new ConvexError("Not authorized");

    // Verify menu ownership for all provided menuIds
    for (const menuId of args.menuIds) {
      const menu = await ctx.db.get(menuId);
      if (!menu) throw new ConvexError(`Menu ${menuId} not found`);
      if (menu.userId !== userId) throw new ConvexError("Not authorized");
    }

    // Get all existing associations for this recipe
    const existingAssociations = await ctx.db
      .query("menusOnRecipes")
      .withIndex("by_recipe", (q) => q.eq("recipeId", args.recipeId))
      .collect();

    // Filter to only user's menus
    const userMenuAssociations = [];
    for (const assoc of existingAssociations) {
      const menu = await ctx.db.get(assoc.menuId);
      if (menu && menu.userId === userId) {
        userMenuAssociations.push(assoc);
      }
    }

    const existingMenuIds = new Set(
      userMenuAssociations.map((assoc) => assoc.menuId),
    );
    const newMenuIds = new Set(args.menuIds);

    // Remove associations that are no longer needed
    for (const assoc of userMenuAssociations) {
      if (!newMenuIds.has(assoc.menuId)) {
        await ctx.db.delete(assoc._id);
      }
    }

    // Add new associations
    for (const menuId of args.menuIds) {
      if (!existingMenuIds.has(menuId)) {
        await ctx.db.insert("menusOnRecipes", {
          menuId,
          recipeId: args.recipeId,
        });
      }
    }

    return null;
  },
});
