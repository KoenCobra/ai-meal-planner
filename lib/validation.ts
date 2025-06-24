import { z } from "zod";

export const generateRecipeSchema = z.object({
  description: z
    .string()
    .max(500, "Description must be at most 500 characters"),
});

export type GenerateRecipeInput = z.infer<typeof generateRecipeSchema>;

export const Recipe = z.object({
  title: z.string().describe("The title of the recipe"),
  summary: z.string().describe("A short summary of the recipe"),
  servings: z.number().describe("The number of servings the recipe makes"),
  readyInMinutes: z
    .number()
    .describe("The number of minutes it takes to prepare the recipe"),
  categories: z
    .array(z.string())
    .describe("The categories the recipe is suitable for"),
  instructions: z.object({
    steps: z.array(
      z.object({
        number: z.number().describe("The step number"),
        step: z.string().describe("The step description"),
      }),
    ),
  }),
  ingredients: z.array(
    z.object({
      name: z.string().describe("The name of the ingredient"),
      measures: z.object({
        amount: z.number().describe("The amount of the ingredient"),
        unit: z
          .string()
          .describe(
            "The units of measurement will be based on the user's locale",
          ),
      }),
    }),
  ),
  dishType: z
    .string()
    .describe(
      "This can only have 1 of the following values: 'breakfast', 'lunch', 'dinner' or 'other'",
    ),
  error: z
    .string()
    .nullish()
    .describe("The error message if the recipe is not generated"),
  image: z.string().nullish().describe("The image of the recipe"),
});

export type RecipeInput = z.infer<typeof Recipe>;

export const createMenuSchema = z.object({
  name: z
    .string()
    .min(1, "Can't be empty")
    .max(50, "Menu name must be less than 50 characters"),
});

export type CreateMenuInput = z.infer<typeof createMenuSchema>;
