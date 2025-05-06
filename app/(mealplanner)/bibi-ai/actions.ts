"use server";

import openai from "@/lib/openai";
import {
  GenerateRecipeInput,
  generateRecipeSchema,
  Recipe,
} from "@/lib/validation";
import { zodResponseFormat } from "openai/helpers/zod";

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

  // try {
  //   const imageResponse = await openai.images.generate({
  //     model: "gpt-image-1",
  //     prompt: `A professional, appetizing photo of ${aiResponse.title} and ${aiResponse.ingredients}. Food photography style, well-lit, on a beautiful plate or setting.`,
  //     size: "1024x1024",
  //     quality: "low",
  //   });

  //   if (imageResponse.data?.[0]?.b64_json) {
  //     // Upload image to Convex
  //     await convex.action(api.recipes.images.uploadGeneratedImage, {
  //       userId,
  //       recipeId,
  //       imageBlob: `data:image/png;base64,${imageResponse.data[0].b64_json}`,
  //     });
  //   }
  // } catch (error) {
  //   console.error("Failed to generate or upload image:", error);
  //   // Continue without image if generation fails
  // }

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
