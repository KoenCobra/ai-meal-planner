import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// JSON Schema for structured output based on Recipe Zod schema
const recipeJsonSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "The title of the recipe",
    },
    summary: {
      type: "string",
      description: "A short summary of the recipe",
    },
    servings: {
      type: "number",
      description: "The number of servings the recipe makes",
    },
    readyInMinutes: {
      type: "number",
      description: "The number of minutes it takes to prepare the recipe",
    },
    categories: {
      type: "array",
      items: {
        type: "string",
      },
      description: "The categories the recipe is suitable for",
    },
    instructions: {
      type: "object",
      properties: {
        steps: {
          type: "array",
          items: {
            type: "object",
            properties: {
              number: {
                type: "number",
                description: "The step number",
              },
              step: {
                type: "string",
                description: "The step description",
              },
            },
            required: ["number", "step"],
            additionalProperties: false,
          },
        },
      },
      required: ["steps"],
      additionalProperties: false,
    },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The name of the ingredient",
          },
          measures: {
            type: "object",
            properties: {
              amount: {
                type: "number",
                description: "The amount of the ingredient",
              },
              unit: {
                type: "string",
                description:
                  "The units of measurement will be based on the user's locale",
              },
            },
            required: ["amount", "unit"],
            additionalProperties: false,
          },
        },
        required: ["name", "measures"],
        additionalProperties: false,
      },
    },
    dishType: {
      type: "string",
      description:
        "This can only have 1 of the following values: 'breakfast', 'lunch', 'snacks' or 'dinner'",
    },
    error: {
      type: ["string", "null"],
      description: "The error message if the recipe is not generated",
    },
    image: {
      type: ["string", "null"],
      description: "The image of the recipe",
    },
  },
  required: [
    "title",
    "summary",
    "servings",
    "readyInMinutes",
    "categories",
    "instructions",
    "ingredients",
    "dishType",
  ],
  additionalProperties: false,
};

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

    // OpenRouter API call with structured output
    const url = "https://openrouter.ai/api/v1/chat/completions";
    const headers = {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    };

    const payload = {
      models: ["google/gemini-2.5-flash-preview-05-20", "openai/gpt-4.1-mini"],
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
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
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
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    // Forward abort signal from request
    req.signal.addEventListener("abort", () => {
      controller.abort();
    });

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

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
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 },
    );
  }
}
