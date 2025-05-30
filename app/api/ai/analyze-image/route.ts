import { api } from "@/convex/_generated/api";
import { Recipe } from "@/lib/validation";
import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Parse form data
    const formData = await req.formData();
    const image = formData.get("image") as File;
    const additionalInstructions = formData.get(
      "additionalInstructions",
    ) as string;

    if (!image) {
      return new Response(JSON.stringify({ error: "Image is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check rate limits
    const rateLimitCheck = await convex.mutation(
      api.openaiRateLimit.checkImageAnalysisLimit,
      {
        userId,
      },
    );

    if (!rateLimitCheck.success) {
      return new Response(
        JSON.stringify({
          error: rateLimitCheck.message || "Rate limit exceeded",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // Analyze image with abort signal
    const { object } = await generateObject({
      model: google("gemini-2.5-flash-preview-05-20"),
      schema: Recipe,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a recipe generator AI. Your task is to analyze the food image and generate a recipe that could recreate this dish. Make sure to generate all the output in the language that is used in the image. ${
                additionalInstructions
                  ? `Additionally, consider these instructions from the user: ${additionalInstructions}`
                  : ""
              }`,
            },
            {
              type: "image",
              image: `data:image/jpeg;base64,${base64Image}`,
            },
          ],
        },
      ],
      abortSignal: req.signal, // Forward the abort signal
    });

    if (!object) {
      return new Response(
        JSON.stringify({ error: "Failed to generate AI response" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const recipe = {
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

    return new Response(JSON.stringify(recipe), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return new Response("Request cancelled", { status: 499 });
    }

    console.error("Error analyzing image:", error);
    return new Response(JSON.stringify({ error: "Failed to analyze image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
