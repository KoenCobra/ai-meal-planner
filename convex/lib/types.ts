import { Id } from "../_generated/dataModel";

/**
 * Standard success/error response type
 */
export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Rate limit check response type
 */
export interface RateLimitResponse {
  success: boolean;
  retryAfter?: number;
  message?: string;
}

/**
 * Grocery item creation input
 */
export interface GroceryItemInput {
  name: string;
  unit?: string;
  quantity?: number;
}

/**
 * Recipe with optional image URL
 */
export interface RecipeWithImage {
  _id: Id<"recipes">;
  userId: string;
  title: string;
  summary: string;
  servings: number;
  readyInMinutes: number;
  imageId?: Id<"_storage">;
  blurDataURL?: string;
  categories: string[];
  instructions: {
    steps: Array<{
      number: number;
      step: string;
    }>;
  };
  ingredients: Array<{
    name: string;
    measures: {
      amount: number;
      unit: string;
    };
  }>;
  dishType: string;
  ingredientsText?: string;
  searchText?: string;
  _creationTime: number;
  imageUrl?: string;
}
