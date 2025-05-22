import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { rateLimiter } from "./rateLimiter";

/**
 * Check rate limit for generating AI recipes
 * Call this before making OpenAI API calls for recipe generation
 */
export const checkRecipeGenerationLimit = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Check per-user limit
      await rateLimiter.limit(ctx, "generateRecipeAI", {
        key: args.userId,
        throws: true,
      });

      // Check global limit
      await rateLimiter.limit(ctx, "globalOpenAIRecipes", { throws: true });

      return { success: true };
    } catch (error) {
      if (error instanceof ConvexError && error.data?.kind === "RateLimited") {
        return {
          success: false,
          retryAfter: error.data.retryAfter,
          message:
            "Rate limit exceeded for recipe generation. Please try again later.",
        };
      }
      throw error;
    }
  },
});

/**
 * Check rate limit for generating AI images
 * Call this before making OpenAI API calls for image generation
 */
export const checkImageGenerationLimit = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Check per-user limit
      await rateLimiter.limit(ctx, "generateImageAI", {
        key: args.userId,
        throws: true,
      });

      // Check global limit
      await rateLimiter.limit(ctx, "globalOpenAIImages", { throws: true });

      return { success: true };
    } catch (error) {
      if (error instanceof ConvexError && error.data?.kind === "RateLimited") {
        return {
          success: false,
          retryAfter: error.data.retryAfter,
          message:
            "Rate limit exceeded for image generation. Please try again later.",
        };
      }
      throw error;
    }
  },
});

/**
 * Check rate limit for analyzing images with AI
 * Call this before making OpenAI API calls for image analysis
 */
export const checkImageAnalysisLimit = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Check per-user limit
      await rateLimiter.limit(ctx, "analyzeImageAI", {
        key: args.userId,
        throws: true,
      });

      // Check global limit
      await rateLimiter.limit(ctx, "globalOpenAIAnalysis", { throws: true });

      return { success: true };
    } catch (error) {
      if (error instanceof ConvexError && error.data?.kind === "RateLimited") {
        return {
          success: false,
          retryAfter: error.data.retryAfter,
          message:
            "Rate limit exceeded for image analysis. Please try again later.",
        };
      }
      throw error;
    }
  },
});
