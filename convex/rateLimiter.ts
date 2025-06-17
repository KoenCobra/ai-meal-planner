import { HOUR, MINUTE, RateLimiter } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

export const rateLimiter = new RateLimiter(components.rateLimiter, {
  createRecipe: {
    kind: "token bucket",
    rate: 10,
    period: MINUTE,
    capacity: 15,
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

  addGroceryItem: {
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

  searchRecipes: {
    kind: "token bucket",
    rate: 20,
    period: MINUTE,
    capacity: 50,
  },

  generateRecipeAI: {
    kind: "token bucket",
    rate: 0,
    period: HOUR,
    capacity: 0,
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
});

export { HOUR, MINUTE, SECOND } from "@convex-dev/rate-limiter";
