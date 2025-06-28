// Image size and dimension limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const recipeJsonSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "The title of the recipe",
    },
    summary: {
      type: "string",
      description: "A short summary of the recipe",
    },
    servings: {
      type: "number",
      description: "The number of servings the recipe makes",
    },
    readyInMinutes: {
      type: "number",
      description: "The number of minutes it takes to prepare the recipe",
    },
    categories: {
      type: "array",
      items: {
        type: "string",
      },
      description: "The categories the recipe is suitable for",
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
                description: "The step description",
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
            description: "The name of the ingredient",
          },
          measures: {
            type: "object",
            properties: {
              amount: {
                type: "number",
                description: "The amount of the ingredient",
              },
              unit: {
                type: "string",
                description:
                  "The units of measurement will be based on the user's locale",
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
      description: "The error message if the recipe is not generated",
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
