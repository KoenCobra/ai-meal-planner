import { api } from "@/convex/_generated/api";
import { recipeJsonSchema } from "@/lib/constants";
import { generateRecipeSchema } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const input = generateRecipeSchema.parse(await req.json());
    const { description } = input;

    const rateLimitCheck = await convex.mutation(
      api.aiRateLimit.checkRecipeGenerationLimit,
      {
        userId,
      },
    );

    if (!rateLimitCheck?.success) {
      return NextResponse.json(
        {
          error: rateLimitCheck?.message || "Rate limit exceeded",
        },
        { status: 429 },
      );
    }

    // OpenRouter API call with structured output
    const url = "https://openrouter.ai/api/v1/chat/completions";
    const headers = {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    };

    const payload = {
      models: ["google/gemini-2.5-flash", "openai/gpt-4.1-mini"],
      messages: [
        {
          role: "user",
          content: `You will always answer in the language that the user is using.Please provide a recipe from this description: ${description}
          If the input has nothing to do with food, or will cause even the slightest bit of harm, please return an error message with the error prop in the shema output.
          If the recipe would cause harm any way to the person's health, please return an error message with the error prop in the shema output.
          Be very detailed and elaborate with the ingredients and steps.
          Smoothies are by default in the "other" dishType.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "recipe",
          strict: true,
          schema: recipeJsonSchema,
        },
      },
      provider: {
        allow_fallbacks: true,
        sort: "latency",
      },
    };

    const controller = new AbortController();

    req.signal.addEventListener("abort", () => {
      controller.abort();
    });

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("OpenRouter API error:", errorData);
      return NextResponse.json(
        { error: `OpenRouter API error: ${response.status}` },
        { status: 500 },
      );
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: "Invalid response from OpenRouter API" },
        { status: 500 },
      );
    }

    const content = data.choices[0].message.content;
    let object;

    try {
      object = JSON.parse(content);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 },
      );
    }

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
    console.error("Error generating recipe", error);
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 },
    );
  }
}
