import { api } from "@/convex/_generated/api";
import { Recipe } from "@/lib/validation";
import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const image = formData.get("image") as File;

    const additionalInstructions = formData.get(
      "additionalInstructions",
    ) as string;

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Check rate limits
    const rateLimitCheck = await convex.mutation(
      api.openaiRateLimit.checkImageAnalysisLimit,
      {
        userId,
      },
    );

    if (!rateLimitCheck.success) {
      return NextResponse.json(
        {
          error: rateLimitCheck.message || "Rate limit exceeded",
        },
        { status: 429 },
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
      return NextResponse.json(
        { error: "Failed to generate AI response" },
        { status: 500 },
      );
    }

    const recipe = {
      title: object.title,
      summary: object.summary,
      servings: object.servings,
      readyInMinutes: object.readyInMinutes,
      categories: object.categories,
      instructions: object.instructions,
      ingredients: object.ingredients,
      dishType: object.dishType,
      error: object.error,
    };

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 },
    );
  }
}
