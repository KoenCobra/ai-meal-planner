"use server";
import { api } from "@/convex/_generated/api";
import groq from "@/lib/groq";
import openai from "@/lib/openai";
import {
  GenerateRecipeInput,
  generateRecipeSchema,
  Recipe,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import sharp from "sharp";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function generateRecipe(input: GenerateRecipeInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Check rate limits before making expensive API call
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

  const systemMessage = `You are a recipe generator AI. Your task is to generate a single recipe entry based on the user input. You will only answer questions that are related to generating a recipe, otherwise you will refuse to generate a recipe and explain why you can't generate a recipe in the error property from the structure. You will always answer in the language that the user is using. The units of measurement will be based on the user's locale. Smoothies are by default snacks. The dishType can only have 1 of the following values: "breakfast", "lunch", "snacks" or "dinner". You can only assign 1 of these values to a recipe.

IMPORTANT JSON FORMATTING RULES:
- Use decimal numbers only (0.5 instead of 1/2)
- No extra fields beyond the specified structure
- All strings must be in double quotes
- Numbers should be valid JSON numbers
- Use null for empty values, not "null"

Your response should ONLY contain a valid JSON object that matches this exact structure:
{
  "title": "string",
  "summary": "string", 
  "servings": number,
  "readyInMinutes": number,
  "diets": ["string"],
  "instructions": {
    "name": "string",
    "steps": [
      {
        "number": number,
        "step": "string"
      }
    ]
  },
  "ingredients": [
    {
      "name": "string",
      "measures": {
        "amount": number,
        "unit": "string"
      }
    }
  ],
  "dishType": "breakfast" | "lunch" | "snacks" | "dinner",
  "error": null,
  "image": null
}`;

  const userMessage = `Please provide a recipe from this description: ${description}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "gemma2-9b-it",
      response_format: { type: "json_object" },
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
    });

    // Extract the response
    const responseContent = completion.choices[0].message.content;

    if (!responseContent) {
      throw new Error("No response content from Groq");
    }

    // Parse and validate JSON
    const jsonData = JSON.parse(responseContent);
    const aiResponse = Recipe.parse(jsonData);

    return {
      title: aiResponse.title,
      summary: aiResponse.summary,
      servings: aiResponse.servings,
      readyInMinutes: aiResponse.readyInMinutes,
      diets: aiResponse.diets,
      instructions: aiResponse.instructions,
      ingredients: aiResponse.ingredients,
      dishType: aiResponse.dishType,
      error: aiResponse.error,
    };
  } catch (error) {
    console.error("Error in generateRecipe:", error);

    if (error instanceof SyntaxError) {
      throw new Error("AI returned invalid JSON format");
    } else if (error instanceof Error && error.message.includes("ZodError")) {
      throw new Error("AI response doesn't match expected recipe schema");
    } else {
      throw new Error(`Failed to generate recipe: ${error}`);
    }
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

  // Check rate limits before making expensive OpenAI API call
  const rateLimitCheck = await convex.mutation(
    api.openaiRateLimit.checkImageGenerationLimit,
    {
      userId,
    },
  );

  if (!rateLimitCheck.success) {
    throw new Error(rateLimitCheck.message || "Rate limit exceeded");
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

export async function analyzeImageForRecipe(
  image: File,
  additionalInstructions?: string,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Check rate limits before making expensive API call
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
    // Convert the image file to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    const systemMessage = `You are a recipe generator AI. Your task is to analyze the food image and generate a recipe that could recreate this dish. The dishType can only have 1 of the following values: "breakfast", "lunch", "snacks" or "dinner". You can only assign 1 of these values to a recipe. Make sure to generate all the output in the language that is used in the image. Provide detailed instructions and ingredients list based on what you see in the image. ${additionalInstructions ? `Additionally, consider these instructions from the user: ${additionalInstructions}` : ""}

IMPORTANT JSON FORMATTING RULES:
- Use decimal numbers only (0.5 instead of 1/2)
- No extra fields beyond the specified structure
- All strings must be in double quotes
- Numbers should be valid JSON numbers
- Use null for empty values, not "null"

Your response should ONLY contain a valid JSON object that matches this exact structure:
{
  "title": "string",
  "summary": "string", 
  "servings": number,
  "readyInMinutes": number,
  "diets": ["string"],
  "instructions": {
    "name": "string",
    "steps": [
      {
        "number": number,
        "step": "string"
      }
    ]
  },
  "ingredients": [
    {
      "name": "string",
      "measures": {
        "amount": number,
        "unit": "string"
      }
    }
  ],
  "dishType": "breakfast" | "lunch" | "snacks" | "dinner",
  "error": null,
  "image": null
}`;

    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Please analyze this food image and generate a recipe for it.${additionalInstructions ? ` ${additionalInstructions}` : ""}`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    // Extract the response
    const responseContent = completion.choices[0].message.content;

    if (!responseContent) {
      throw new Error("No response content from Groq");
    }

    // Parse and validate JSON
    const jsonData = JSON.parse(responseContent);
    const aiResponse = Recipe.parse(jsonData);

    return {
      title: aiResponse.title,
      summary: aiResponse.summary,
      servings: aiResponse.servings,
      readyInMinutes: aiResponse.readyInMinutes,
      diets: aiResponse.diets,
      instructions: aiResponse.instructions,
      ingredients: aiResponse.ingredients,
      dishType: aiResponse.dishType,
      error: aiResponse.error,
    };
  } catch (error) {
    console.error("Error analyzing image:", error);

    if (error instanceof SyntaxError) {
      throw new Error("AI returned invalid JSON format");
    } else if (error instanceof Error && error.message.includes("ZodError")) {
      throw new Error("AI response doesn't match expected recipe schema");
    } else {
      throw new Error(`Failed to analyze image: ${error}`);
    }
  }
}
