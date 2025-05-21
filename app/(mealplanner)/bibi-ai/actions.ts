"use server";

import googleai from "@/lib/googleai";
import { GenerateRecipeInput, generateRecipeSchema } from "@/lib/validation";
import { Type } from "@google/genai";
import sharp from "sharp";

import { auth } from "@clerk/nextjs/server";

export async function generateRecipe(input: GenerateRecipeInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { description } = generateRecipeSchema.parse(input);

  const systemMessage = `
  You are a recipe generator AI. Your task is to generate a single recipe entry based on the user input.
  You will only answer questions that are related to generating a recipe, otherwise you will refuse to generate a recipe and explain why you can't generate a recipe in the error property from the structure.
  You will always answer in the language that the user is using.
  The units of measurement will be based on the user's locale.
  Your response must adhere to the given structure.
  Smoothies are by default snacks.
  The dishTypes can only have 1 of the following values: "breakfast", "lunch", snacks  or "dinner".
  You can only assign 1 of these values to a recipe.
  IMPORTANT: You must return a complete recipe with all required fields: title, summary, servings, readyInMinutes, diets, instructions (with steps), ingredients, and dishTypes.`;

  const userMessage = `
  Please provide a recipe from this description:
  ${description}
  `;

  try {
    const response = await googleai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: [
        {
          role: "user",
          parts: [{ text: systemMessage }, { text: userMessage }],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            servings: { type: Type.INTEGER },
            readyInMinutes: { type: Type.INTEGER },
            diets: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            instructions: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                steps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      number: { type: Type.INTEGER },
                      step: { type: Type.STRING },
                    },
                  },
                },
              },
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  measures: {
                    type: Type.OBJECT,
                    properties: {
                      amount: { type: Type.NUMBER },
                      unit: { type: Type.STRING },
                    },
                  },
                },
              },
            },
            dishTypes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            error: { type: Type.STRING, nullable: true },
          },
          propertyOrdering: [
            "title",
            "summary",
            "servings",
            "readyInMinutes",
            "diets",
            "instructions",
            "ingredients",
            "dishTypes",
            "error",
          ],
        },
      },
    });

    // Parse the JSON response
    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Google AI");
    }

    console.log(responseText);

    const aiResponse = JSON.parse(responseText);

    console.log(aiResponse);

    if (!aiResponse) {
      throw new Error("Failed to generate AI response");
    }

    return {
      title: aiResponse.title,
      summary: aiResponse.summary,
      servings: aiResponse.servings,
      readyInMinutes: aiResponse.readyInMinutes,
      diets: aiResponse.diets,
      instructions: aiResponse.instructions,
      ingredients: aiResponse.ingredients,
      dishTypes: aiResponse.dishTypes,
      error: aiResponse.error,
    };
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error(`Failed to generate recipe: ${error}`);
  }
}

export async function generateRecipeImage(
  recipeTitle: string,
  recipeDescription: string,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await googleai.models.generateImages({
      model: "imagen-3.0-generate-002",
      prompt: `Professional food photography of ${recipeTitle}. ${recipeDescription}. Top-down view, beautiful plating, restaurant quality, soft natural lighting.`,
      config: {
        numberOfImages: 1,
      },
    });

    // Check if we have a valid response
    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("Empty response from Google AI");
    }

    const imageData = response.generatedImages[0];
    if (!imageData || !imageData.image || !imageData.image.imageBytes) {
      throw new Error("Invalid image data structure");
    }

    const imageBytes = imageData.image.imageBytes;

    // Convert base64 to buffer
    const buffer = Buffer.from(imageBytes, "base64");

    // Use Sharp to convert to WebP format with compression
    const webpBuffer = await sharp(buffer)
      .resize(800) // Resize to smaller dimensions
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .toBuffer();

    // Convert back to base64 for return
    const webpBase64 = webpBuffer.toString("base64");

    return {
      imageBase64: `data:image/webp;base64,${webpBase64}`,
    };
  } catch (error) {
    console.error("Error in generateRecipeImage:", error);
    throw new Error(`Failed to generate or upload image: ${error}`);
  }
}

export async function convertToWebp(imageBase64: string) {
  try {
    // Remove data URL prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Use Sharp to convert to WebP format with compression
    const webpBuffer = await sharp(buffer)
      .resize(800) // Resize to smaller dimensions
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .toBuffer();

    // Convert back to base64
    const webpBase64 = webpBuffer.toString("base64");

    return {
      imageBase64: `data:image/webp;base64,${webpBase64}`,
    };
  } catch (error) {
    console.error("Error converting image to WebP:", error);
    throw new Error(`Failed to convert image to WebP: ${error}`);
  }
}

export async function analyzeImageForRecipe(
  image: File,
  additionalInstructions?: string,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Convert the image file to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    const systemMessage = `
    You are a recipe generator AI. Your task is to analyze the food image and generate a recipe that could recreate this dish. 
    The dishTypes can only have 1 of the following values: "breakfast", "lunch", "snacks" or "dinner".
    Provide detailed instructions and ingredients list based on what you see in the image. Make sure to generate the recipe in the language that is used in the image.
    If for example the image is in spanish, the recipe should be in spanish.
    
    IMPORTANT: You must return a complete recipe with all required fields: title, summary, servings, readyInMinutes, diets, instructions (with steps), ingredients, and dishTypes.
    ${additionalInstructions ? `Additionally, consider these instructions from the user: ${additionalInstructions}` : ""}`;

    const userMessage = `Please analyze this food image and generate a recipe for it.${additionalInstructions ? ` ${additionalInstructions}` : ""}`;

    const response = await googleai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: [
        {
          role: "user",
          parts: [
            { text: systemMessage },
            { text: userMessage },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            servings: { type: Type.INTEGER },
            readyInMinutes: { type: Type.INTEGER },
            diets: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            instructions: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                steps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      number: { type: Type.INTEGER },
                      step: { type: Type.STRING },
                    },
                  },
                },
              },
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  measures: {
                    type: Type.OBJECT,
                    properties: {
                      amount: { type: Type.NUMBER },
                      unit: { type: Type.STRING },
                    },
                  },
                },
              },
            },
            dishTypes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            error: { type: Type.STRING, nullable: true },
          },
          propertyOrdering: [
            "title",
            "summary",
            "servings",
            "readyInMinutes",
            "diets",
            "instructions",
            "ingredients",
            "dishTypes",
            "error",
          ],
        },
      },
    });

    // Parse the JSON response
    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Google AI");
    }

    const aiResponse = JSON.parse(responseText);

    console.log(aiResponse);

    if (!aiResponse) {
      throw new Error("Failed to generate AI response");
    }

    return {
      title: aiResponse.title,
      summary: aiResponse.summary,
      servings: aiResponse.servings,
      readyInMinutes: aiResponse.readyInMinutes,
      diets: aiResponse.diets,
      instructions: aiResponse.instructions,
      ingredients: aiResponse.ingredients,
      dishTypes: aiResponse.dishTypes,
      error: aiResponse.error,
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error(`Failed to analyze image: ${error}`);
  }
}
