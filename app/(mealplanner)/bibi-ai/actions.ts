"use server";

import openai from "@/lib/openai";
import { zodResponseFormat } from "openai/helpers/zod";
import {
  GenerateRecipeInput,
  generateRecipeSchema,
  Recipe,
} from "@/lib/validation";

import { auth } from "@clerk/nextjs/server";

export async function generateRecipe(input: GenerateRecipeInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { description } = generateRecipeSchema.parse(input);

  const systemMessage = `
  You are a recipe generator AI. Your task is to generate a single recipe entry based on the user input. You will only answer questions that are related to generating a recipe, otherwise you will refuse to generate a recipe and explain why you can't generate a recipe in the error property from the structure. You will always answer in the language that the user is using. The units of measurement will be based on the user's locale. Your response must adhere to the given structure. The dishTypes can only have the values of "breakfast", "lunch", snacks  or "dinner"
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
