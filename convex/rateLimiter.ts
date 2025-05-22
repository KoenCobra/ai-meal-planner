import { HOUR, MINUTE, RateLimiter } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

// Centralized rate limiter configuration
export const rateLimiter = new RateLimiter(components.rateLimiter, {
  // Recipe operations - limit creation to prevent spam
  createRecipe: {
    kind: "token bucket",
    rate: 10,
    period: MINUTE,
    capacity: 15,
  },
  updateRecipe: {
    kind: "token bucket",
    rate: 20,
    period: MINUTE,
    capacity: 30,
  },
  deleteRecipe: { kind: "token bucket", rate: 5, period: MINUTE, capacity: 10 },
  syncRecipeIngredients: {
    kind: "token bucket",
    rate: 5,
    period: MINUTE,
    capacity: 8,
  },

  // Menu operations - limit creation and sync operations
  createMenu: { kind: "token bucket", rate: 8, period: MINUTE, capacity: 12 },
  updateMenu: { kind: "token bucket", rate: 15, period: MINUTE, capacity: 20 },
  deleteMenu: { kind: "token bucket", rate: 5, period: MINUTE, capacity: 8 },
  addRecipeToMenu: {
    kind: "token bucket",
    rate: 30,
    period: MINUTE,
    capacity: 50,
  },
  removeRecipeFromMenu: {
    kind: "token bucket",
    rate: 30,
    period: MINUTE,
    capacity: 50,
  },
  syncMenuIngredients: {
    kind: "token bucket",
    rate: 3,
    period: MINUTE,
    capacity: 5,
  },

  // Grocery list operations - prevent spam adding/clearing
  addGroceryItem: {
    kind: "token bucket",
    rate: 50,
    period: MINUTE,
    capacity: 75,
  },
  updateGroceryItem: {
    kind: "token bucket",
    rate: 30,
    period: MINUTE,
    capacity: 45,
  },
  deleteGroceryItem: {
    kind: "token bucket",
    rate: 30,
    period: MINUTE,
    capacity: 45,
  },
  toggleGroceryItem: {
    kind: "token bucket",
    rate: 100,
    period: MINUTE,
    capacity: 150,
  },
  clearGroceryItems: {
    kind: "token bucket",
    rate: 3,
    period: MINUTE,
    capacity: 5,
  },
  clearAllGroceryItems: {
    kind: "token bucket",
    rate: 2,
    period: MINUTE,
    capacity: 3,
  },

  // File operations - expensive operations that need tight control
  generateUploadUrl: {
    kind: "token bucket",
    rate: 10,
    period: MINUTE,
    capacity: 15,
  },
  updateRecipeImage: {
    kind: "token bucket",
    rate: 10,
    period: MINUTE,
    capacity: 15,
  },

  // Search operations - prevent expensive search spam
  searchRecipes: {
    kind: "token bucket",
    rate: 60,
    period: MINUTE,
    capacity: 100,
  },
  searchIngredients: {
    kind: "token bucket",
    rate: 60,
    period: MINUTE,
    capacity: 100,
  },
  searchGroceryItems: {
    kind: "token bucket",
    rate: 60,
    period: MINUTE,
    capacity: 100,
  },

  // Global limits for resource-intensive operations (per IP/anonymous users)
  globalFileUploads: {
    kind: "fixed window",
    rate: 100,
    period: HOUR,
    shards: 5,
  },
  globalRecipeCreation: {
    kind: "fixed window",
    rate: 1000,
    period: HOUR,
    shards: 10,
  },
  globalMenuCreation: {
    kind: "fixed window",
    rate: 500,
    period: HOUR,
    shards: 5,
  },

  // OpenAI API calls - expensive operations that need tight control
  generateRecipeAI: {
    kind: "token bucket",
    rate: 20,
    period: HOUR,
    capacity: 25,
  },
  generateImageAI: {
    kind: "token bucket",
    rate: 10,
    period: HOUR,
    capacity: 12,
  },
  analyzeImageAI: {
    kind: "token bucket",
    rate: 15,
    period: HOUR,
    capacity: 18,
  },

  // Global limits for OpenAI API usage
  globalOpenAIRecipes: {
    kind: "fixed window",
    rate: 1000,
    period: HOUR,
    shards: 10,
  },
  globalOpenAIImages: {
    kind: "fixed window",
    rate: 500,
    period: HOUR,
    shards: 5,
  },
  globalOpenAIAnalysis: {
    kind: "fixed window",
    rate: 750,
    period: HOUR,
    shards: 8,
  },

  // Auth-related limits (if you add authentication failures in the future)
  authFailures: {
    kind: "token bucket",
    rate: 5,
    period: HOUR,
  },
});

export { HOUR, MINUTE, SECOND } from "@convex-dev/rate-limiter";
