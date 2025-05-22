import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { rateLimiter } from "./rateLimiter";

/**
 * Rate-limited recipe search by title
 * This wraps the search query with rate limiting to prevent expensive search spam
 */
export const searchRecipesWithRateLimit = mutation({
  args: {
    userId: v.string(),
    query: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // Rate limit search operations per user
    await rateLimiter.limit(ctx, "searchRecipes", {
      key: args.userId,
      throws: true,
    });

    // Perform the actual search using a query
    return await ctx.db
      .query("recipes")
      .withSearchIndex("search_title", (q) =>
        q.search("title", args.query).eq("userId", args.userId),
      )
      .paginate(args.paginationOpts);
  },
});

/**
 * Rate-limited recipe search by ingredients
 * This wraps the search query with rate limiting to prevent expensive search spam
 */
export const searchRecipesByIngredientsWithRateLimit = mutation({
  args: {
    userId: v.string(),
    query: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // Rate limit ingredient search per user
    await rateLimiter.limit(ctx, "searchIngredients", {
      key: args.userId,
      throws: true,
    });

    // Perform the actual search using a query
    return await ctx.db
      .query("recipes")
      .withSearchIndex("search_ingredients", (q) =>
        q.search("ingredients", args.query).eq("userId", args.userId),
      )
      .paginate(args.paginationOpts);
  },
});

/**
 * Rate-limited grocery item search
 * This wraps the search query with rate limiting to prevent expensive search spam
 */
export const searchGroceryItemsWithRateLimit = mutation({
  args: {
    userId: v.string(),
    query: v.string(),
  },
  handler: async (ctx, args) => {
    // Rate limit grocery item search per user
    await rateLimiter.limit(ctx, "searchGroceryItems", {
      key: args.userId,
      throws: true,
    });

    // Perform the actual search using a query
    const results = await ctx.db
      .query("groceryItems")
      .withSearchIndex("search_name", (q) =>
        q.search("name", args.query).eq("userId", args.userId),
      )
      .collect();

    return results;
  },
});
