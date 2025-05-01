import { z } from "zod";

export const generateRecipeSchema = z.object({
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
});

export type GenerateRecipeInput = z.infer<typeof generateRecipeSchema>;

export const Recipe = z.object({
  title: z.string(),
  summary: z.string(),
  servings: z.number(),
  readyInMinutes: z.number(),
  diets: z.array(z.string()),
  instructions: z.object({
    name: z.string(),
    steps: z.array(
      z.object({
        number: z.number(),
        step: z.string(),
      }),
    ),
  }),
  ingredients: z.array(
    z.object({
      name: z.string(),
      measures: z.object({
        amount: z.number(),
        unit: z.string(),
      }),
    }),
  ),
  dishTypes: z.array(z.string()),
  error: z.string().optional().nullable(),
});

export type RecipeInput = z.infer<typeof Recipe>;

export const createMenuSchema = z.object({
  name: z
    .string()
    .min(1, "Can't be empty")
    .max(50, "Menu name must be less than 50 characters"),
});

export type CreateMenuInput = z.infer<typeof createMenuSchema>;
