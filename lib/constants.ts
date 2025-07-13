import { PreferencesInput } from "./validation";

// Image size and dimension limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const recipeJsonSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description:
        "The title of the recipe in the language that the user is using from the input",
    },
    summary: {
      type: "string",
      description:
        "A short summary of the recipe in the language that the user is using from the input",
    },
    servings: {
      type: "number",
      description:
        "The number of servings the recipe makes in the language that the user is using from the input",
    },
    readyInMinutes: {
      type: "number",
      description:
        "The number of minutes it takes to prepare the recipe in the language that the user is using from the input",
    },
    categories: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "The categories the recipe is suitable for in the language that the user is using from the input",
    },
    instructions: {
      type: "object",
      properties: {
        steps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              number: {
                type: "number",
                description: "The step number",
              },
              step: {
                type: "string",
                description:
                  "The step description in the language that the user is using from the input",
              },
            },
            required: ["number", "step"],
            additionalProperties: false,
          },
        },
      },
      required: ["steps"],
      additionalProperties: false,
    },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "The name of the ingredient in the language that the user is using from the input",
          },
          measures: {
            type: "object",
            properties: {
              amount: {
                type: "number",
                description:
                  "The amount of the ingredient in the language that the user is using from the input",
              },
              unit: {
                type: "string",
                description:
                  "The units of measurement will be based on the user's locale in the language that the user is using from the input",
              },
            },
            required: ["amount", "unit"],
            additionalProperties: false,
          },
        },
        required: ["name", "measures"],
        additionalProperties: false,
      },
    },
    dishType: {
      type: "string",
      description:
        "This can only have 1 of the following values: 'breakfast', 'lunch', 'dinner' or 'other'",
    },
    error: {
      type: ["string", "null"],
      description:
        "The error message if the recipe is not generated in the language that the user is using from the input",
    },
    image: {
      type: ["string", "null"],
      description: "The image of the recipe",
    },
  },
  required: [
    "title",
    "summary",
    "servings",
    "readyInMinutes",
    "categories",
    "instructions",
    "ingredients",
    "dishType",
  ],
  additionalProperties: false,
};

export const nutritionalValuesResponseSchema = {
  type: "object",
  properties: {
    calories: {
      type: ["number", "null"],
      description: "Total calories for the entire recipe",
    },
    protein: {
      type: ["number", "null"],
      description: "Total protein content in grams",
    },
    totalFat: {
      type: ["number", "null"],
      description: "Total fat content in grams",
    },
    saturatedFat: {
      type: ["number", "null"],
      description: "Total saturated fat content in grams",
    },
    unsaturatedFat: {
      type: ["number", "null"],
      description: "Total unsaturated fat content in grams",
    },
    totalCarbohydrates: {
      type: ["number", "null"],
      description: "Total carbohydrates content in grams",
    },
    sugars: {
      type: ["number", "null"],
      description: "Total sugar content in grams",
    },
    cholesterol: {
      type: ["number", "null"],
      description: "Total cholesterol content in milligrams",
    },
    sodium: {
      type: ["number", "null"],
      description: "Total sodium content in milligrams",
    },
    fiber: {
      type: ["number", "null"],
      description: "Total fiber content in grams",
    },
    error: {
      type: ["string", "null"],
      description: "Error message if nutritional analysis fails",
    },
  },
  additionalProperties: false,
};

export const generateRecipeSystemPrompt = `Generate all the output in the language that is used by the user's input. If the input has nothing to do with food, or will cause even the slightest bit of harm, please return an error message with the error prop in the shema output. If the recipe would cause harm any way to the person's health, please return an error message with the error prop in the shema output. Be very detailed and elaborate with the ingredients and steps. Smoothies are by default in the "other" dishType.`;

export const generateRecipeUserPrompt = (
  description: string,
  preferences: PreferencesInput,
) =>
  `Please provide a recipe from this description: ${description}, ${preferences.diets ? `only use the following diets: ${preferences.diets},` : ""} ${preferences.allergies ? `exclude recipes that contain the following allergies: ${preferences.allergies},` : ""} ${preferences.preferences ? `only use the following preferences: ${preferences.preferences},` : ""} ${preferences.servings ? `only use the following servings: ${preferences.servings},` : ""} ${preferences.readyInMinutes ? `only use the following ready in minutes: ${preferences.readyInMinutes}` : ""} ${preferences.additionalInstructions ? `additional instructions: ${preferences.additionalInstructions}` : ""}`;

export const analyzeImageSystemPrompt = `You are a recipe generator AI. Your task is to analyze the food image and generate a recipe that could recreate this dish. Make sure to generate all the output in the language that is used in the image. If the input has nothing to do with food, or will cause even the slightest bit of harm please return an error message with the error prop in the shema output. If the recipe would cause harm any way to the person's health, please return an error message with the error prop in the shema output. Be very detailed and elaborate with the ingredients and steps. Smoothies are by default in the "other" category.`;

export const analyzeImageUserPrompt = (additionalInstructions: string) =>
  `${additionalInstructions ? `Additionally, consider these instructions from the user: ${additionalInstructions}` : ""}`;
