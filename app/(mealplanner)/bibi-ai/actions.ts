"use server";
import { api } from "@/convex/_generated/api";
// import openai from "@/lib/openai";
import {
  GenerateRecipeInput,
  generateRecipeSchema,
  Recipe,
} from "@/lib/validation";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function generateRecipe(input: GenerateRecipeInput) {
  const { userId, has } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Check rate limits before making expensive OpenAI API call
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

  const model = has({ plan: "serious_sizzler" })
    ? google("gemini-2.5-flash-preview-05-20")
    : openai("gpt-4.1-mini");

  const { object } = await generateObject({
    model,
    output: "object",
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

// export async function generateRecipeImage(
//   recipeTitle: string,
//   recipeDescription: string,
// ) {
//   const { userId } = await auth();

//   if (!userId) {
//     throw new Error("Unauthorized");
//   }

//   // Check rate limits before making expensive OpenAI API call
//   const rateLimitCheck = await convex.mutation(
//     api.openaiRateLimit.checkImageGenerationLimit,
//     {
//       userId,
//     },
//   );

//   if (!rateLimitCheck.success) {
//     throw new Error(rateLimitCheck.message || "Rate limit exceeded");
//   }

//   try {
//     const response = await openai.images.generate({
//       model: "gpt-image-1",
//       prompt: `Professional food photography of ${recipeTitle}. ${recipeDescription}. Top-down view, beautiful plating, restaurant quality, soft natural lighting.`,
//       n: 1,
//       size: "1024x1024",
//       quality: "low",
//     });

//     // Check if we have a valid response
//     if (!response.data || response.data.length === 0) {
//       throw new Error("Empty response from OpenAI");
//     }

//     const imageData = response.data[0];
//     if (!imageData || typeof imageData !== "object") {
//       throw new Error("Invalid image data structure");
//     }

//     const b64Json = imageData.b64_json;
//     if (!b64Json) {
//       throw new Error("No base64 image data in response");
//     }

//     // Convert base64 to buffer
//     const buffer = Buffer.from(b64Json, "base64");

//     // Use Sharp to convert to WebP format with compression
//     const webpBuffer = await sharp(buffer)
//       .resize(800) // Resize to smaller dimensions
//       .webp({ quality: 80 }) // Convert to WebP with 80% quality
//       .toBuffer();

//     // Convert back to base64 for return
//     const webpBase64 = webpBuffer.toString("base64");

//     return {
//       imageBase64: `data:image/webp;base64,${webpBase64}`,
//     };
//   } catch (error) {
//     console.error("Error in generateRecipeImage:", error);
//     throw new Error(`Failed to generate or upload image: ${error}`);
//   }
// }

export async function analyzeImageForRecipe(
  image: File,
  additionalInstructions?: string,
) {
  const { userId, has } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Check rate limits before making expensive OpenAI API call
  const rateLimitCheck = await convex.mutation(
    api.openaiRateLimit.checkImageAnalysisLimit,
    {
      userId,
    },
  );

  if (!rateLimitCheck.success) {
    throw new Error(rateLimitCheck.message || "Rate limit exceeded");
  }

  const model = has({ plan: "serious_sizzler" })
    ? google("gemini-2.5-flash-preview-05-20")
    : openai("gpt-4.1-mini");

  try {
    // Convert the image file to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    const { object } = await generateObject({
      model,
      output: "object",
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
