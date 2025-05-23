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
  deleteRecipe: {
    kind: "token bucket",
    rate: 15,
    period: MINUTE,
    capacity: 25,
  },
  syncRecipeIngredients: {
    kind: "token bucket",
    rate: 15,
    period: MINUTE,
    capacity: 25,
  },

  // Menu operations - limit creation and sync operations
  createMenu: { kind: "token bucket", rate: 20, period: MINUTE, capacity: 25 },
  updateMenu: { kind: "token bucket", rate: 20, period: MINUTE, capacity: 25 },
  deleteMenu: { kind: "token bucket", rate: 15, period: MINUTE, capacity: 20 },
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
    rate: 20,
    period: MINUTE,
    capacity: 50,
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
    rate: 50,
    period: MINUTE,
    capacity: 75,
  },
  deleteGroceryItem: {
    kind: "token bucket",
    rate: 50,
    period: MINUTE,
    capacity: 75,
  },
  toggleGroceryItem: {
    kind: "token bucket",
    rate: 100,
    period: MINUTE,
    capacity: 150,
  },
  clearGroceryItems: {
    kind: "token bucket",
    rate: 15,
    period: MINUTE,
    capacity: 25,
  },
  clearAllGroceryItems: {
    kind: "token bucket",
    rate: 15,
    period: MINUTE,
    capacity: 25,
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
    rate: 20,
    period: MINUTE,
    capacity: 50,
  },
  searchIngredients: {
    kind: "token bucket",
    rate: 20,
    period: MINUTE,
    capacity: 50,
  },
  searchGroceryItems: {
    kind: "token bucket",
    rate: 20,
    period: MINUTE,
    capacity: 50,
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
    rate: 25,
    period: HOUR,
    capacity: 30,
  },
  generateImageAI: {
    kind: "token bucket",
    rate: 25,
    period: HOUR,
    capacity: 30,
  },
  analyzeImageAI: {
    kind: "token bucket",
    rate: 25,
    period: HOUR,
    capacity: 30,
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
