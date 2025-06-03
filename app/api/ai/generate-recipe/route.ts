import { api } from "@/convex/_generated/api";
import { generateRecipeSchema, Recipe } from "@/lib/validation";
import { google } from "@ai-sdk/google";
import { auth } from "@clerk/nextjs/server";
import { generateObject } from "ai";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  console.log("API route called: /api/ai/generate-recipe");

  try {
    const { userId } = await auth();
    console.log("User ID:", userId);

    if (!userId) {
      console.log("Unauthorized: No user ID");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const input = generateRecipeSchema.parse(await req.json());
    const { description } = input;
    console.log("Description:", description);

    if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 },
      );
    }

    const rateLimitCheck = await convex.mutation(
      api.openaiRateLimit.checkRecipeGenerationLimit,
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

    const { object } = await generateObject({
      model: google("gemini-2.5-flash-preview-05-20"),
      schema: Recipe,
      prompt: `You will always answer in the language that the user is using. Smoothies are by default snacks. Please provide a recipe from this description: ${description}`,
      abortSignal: req.signal,
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

    console.log("Recipe generated successfully");
    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 },
    );
  }
}
