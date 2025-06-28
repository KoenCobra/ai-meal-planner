import { api } from "@/convex/_generated/api";
import { nutritionalValuesResponseSchema } from "@/lib/constants";
import { generateNutritionalValuesSchema } from "@/lib/validation";
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

    const input = generateNutritionalValuesSchema.parse(await req.json());
    const { ingredients, servings } = input;

    const rateLimitCheck = await convex.mutation(
      api.aiRateLimit.checkNutritionalValuesGenerationLimit,
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

    // Create detailed ingredient list for AI
    const ingredientList = ingredients
      .map(
        (ingredient) =>
          `${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`,
      )
      .join(", ");

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
          content: `Please calculate the total nutritional values for the entire recipe with the following ingredients:
                    Ingredients: ${ingredientList}
                    Recipe servings: ${servings}
                    Be as accurate as possible with the nutritional data. Use standard nutritional databases as reference.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "nutritional_response",
          strict: true,
          schema: nutritionalValuesResponseSchema,
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

    // Return the simplified nutritional analysis
    const nutritionalResponse = {
      calories: object.calories,
      protein: object.protein,
      totalFat: object.totalFat,
      saturatedFat: object.saturatedFat,
      polyunsaturatedFat: object.polyunsaturatedFat,
      totalCarbohydrates: object.totalCarbohydrates,
      sugars: object.sugars,
      cholesterol: object.cholesterol,
      sodium: object.sodium,
      error: object.error,
    };

    return NextResponse.json(nutritionalResponse, { status: 200 });
  } catch (error) {
    console.error("Error generating nutritional values", error);
    return NextResponse.json(
      { error: "Failed to generate nutritional values" },
      { status: 500 },
    );
  }
}
