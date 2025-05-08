"use server";

import openai from "@/lib/openai";
import {
  GenerateRecipeInput,
  generateRecipeSchema,
  Recipe,
} from "@/lib/validation";
import { zodResponseFormat } from "openai/helpers/zod";
import sharp from "sharp";

import { auth } from "@clerk/nextjs/server";

export async function generateRecipe(input: GenerateRecipeInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { description } = generateRecipeSchema.parse(input);

  const systemMessage = `
  You are a recipe generator AI. Your task is to generate a single recipe entry based on the user input. You will only answer questions that are related to generating a recipe, otherwise you will refuse to generate a recipe and explain why you can't generate a recipe in the error property from the structure. You will always answer in the language that the user is using. The units of measurement will be based on the user's locale. Your response must adhere to the given structure. The dishTypes can only have 1 of the following values: "breakfast", "lunch", snacks  or "dinner". You can only assign 1 of these values to a recipe.
  `;

  const userMessage = `
  Please provide a recipe from this description:
  ${description}
  `;

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    response_format: zodResponseFormat(Recipe, "generate_recipe"),
  });

  const aiResponse = completion.choices[0].message.parsed;

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
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `Professional food photography of ${recipeTitle}. ${recipeDescription}. Top-down view, beautiful plating, restaurant quality, soft natural lighting.`,
      n: 1,
      size: "1024x1024",
      quality: "low",
    });

    // Check if we have a valid response
    if (!response.data || response.data.length === 0) {
      throw new Error("Empty response from OpenAI");
    }

    const imageData = response.data[0];
    if (!imageData || typeof imageData !== "object") {
      throw new Error("Invalid image data structure");
    }

    const b64Json = imageData.b64_json;
    if (!b64Json) {
      throw new Error("No base64 image data in response");
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(b64Json, "base64");

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
