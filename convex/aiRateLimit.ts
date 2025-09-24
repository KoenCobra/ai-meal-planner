import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { rateLimiter } from "./rateLimiter";

export const checkRecipeGenerationLimit = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await rateLimiter.limit(ctx, "generateRecipeAI", {
        key: args.userId,
        throws: true,
      });
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
      return {
        success: false,
        message:
          "An unexpected error occurred during recipe generation rate limit check.",
      };
    }
  },
});

export const checkImageGenerationLimit = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await rateLimiter.limit(ctx, "generateImageAI", {
        key: args.userId,
        throws: true,
      });
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
      return {
        success: false,
        message:
          "An unexpected error occurred during image generation rate limit check.",
      };
    }
  },
});

export const checkImageAnalysisLimit = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await rateLimiter.limit(ctx, "analyzeImageAI", {
        key: args.userId,
        throws: true,
      });
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
      return {
        success: false,
        message:
          "An unexpected error occurred during image analysis rate limit check.",
      };
    }
  },
});

export const checkNutritionalValuesGenerationLimit = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      await rateLimiter.limit(ctx, "generateNutritionalValuesAI", {
        key: args.userId,
        throws: true,
      });
      return { success: true };
    } catch (error) {
      if (error instanceof ConvexError && error.data?.kind === "RateLimited") {
        return {
          success: false,
          retryAfter: error.data.retryAfter,
          message:
            "Rate limit exceeded for nutritional values generation. Please try again later.",
        };
      }
      return {
        success: false,
        message:
          "An unexpected error occurred during nutritional values generation rate limit check.",
      };
    }
  },
});
