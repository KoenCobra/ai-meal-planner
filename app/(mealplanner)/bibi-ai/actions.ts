"use server";

import { api } from "@/convex/_generated/api";
import { getTextModelBasedOnUserPlan } from "@/lib/userPlan";
import {
  GenerateRecipeInput,
  generateRecipeSchema,
  Recipe,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { fal } from "@fal-ai/client";
import { generateObject } from "ai";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export async function generateRecipe(input: GenerateRecipeInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const rateLimitCheck = await convex.mutation(
    api.openaiRateLimit.checkRecipeGenerationLimit,
    {
      userId,
    },
  );

  if (!rateLimitCheck.success) {
    throw new Error(rateLimitCheck.message || "Rate limit exceeded");
  }

  const { description } = generateRecipeSchema.parse(input);

  const { object } = await generateObject({
    model: await getTextModelBasedOnUserPlan(),
    schema: Recipe,
    prompt: `You will always answer in the language that the user is using. Smoothies are by default snacks. Please provide a recipe from this description: ${description}`,
  });

  if (!object) {
    throw new Error("Failed to generate AI response");
  }

  return {
    title: object.title,
    summary: object.summary,
    servings: object.servings,
    readyInMinutes: object.readyInMinutes,
    diets: object.diets,
    instructions: object.instructions,
    ingredients: object.ingredients,
    dishType: object.dishType,
    error: object.error,
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

  const rateLimitCheck = await convex.mutation(
    api.openaiRateLimit.checkImageGenerationLimit,
    {
      userId,
    },
  );

  if (!rateLimitCheck.success) {
    throw new Error(rateLimitCheck.message || "Rate limit exceeded");
  }

  const result = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt: `Professional food photography of ${recipeTitle}. ${recipeDescription}.Super high def 4K quality, and detailed.`,
      image_size: "square_hd",
    },
  });

  return result.data.images[0].url;
}

export async function analyzeImageForRecipe(
  image: File,
  additionalInstructions?: string,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const rateLimitCheck = await convex.mutation(
    api.openaiRateLimit.checkImageAnalysisLimit,
    {
      userId,
    },
  );

  if (!rateLimitCheck.success) {
    throw new Error(rateLimitCheck.message || "Rate limit exceeded");
  }

  try {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    const { object } = await generateObject({
      model: await getTextModelBasedOnUserPlan(),
      schema: Recipe,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a recipe generator AI. Your task is to analyze the food image and generate a recipe that could recreate this dish. Make sure to generate all the output in the language that is used in the image. ${additionalInstructions ? `Additionally, consider these instructions from the user: ${additionalInstructions}` : ""}`,
            },
            {
              type: "image",
              image: `data:image/jpeg;base64,${base64Image}`,
            },
          ],
        },
      ],
    });

    if (!object) {
      throw new Error("Failed to generate AI response");
    }

    return {
      title: object.title,
      summary: object.summary,
      servings: object.servings,
      readyInMinutes: object.readyInMinutes,
      diets: object.diets,
      instructions: object.instructions,
      ingredients: object.ingredients,
      dishType: object.dishType,
      error: object.error,
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error(`Failed to analyze image: ${error}`);
  }
}

export async function convertToWebp(imageBase64: string) {
  const sharp = (await import("sharp")).default;

  try {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

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
