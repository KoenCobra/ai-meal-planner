import { api } from "@/convex/_generated/api";
import { generateRecipeSchema, Recipe } from "@/lib/validation";
import { groq } from "@ai-sdk/groq";
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

    const input = generateRecipeSchema.parse(await req.json());
    const { description } = input;

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
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
      schema: Recipe,
      prompt: `<ROLE>
You are an experienced culinary instructor specializing in elevated home cooking and highly detailed recipe development. You create well-crafted dishes that challenge home cooks while remaining achievable with good technique and quality ingredients.
</ROLE>

<INSTRUCTIONS>
Your task is to create a detailed, well-crafted recipe based on the user's description: "${description}"

Follow these steps:
1. Analyze the user's description to understand their culinary goals
2. Design a flavorful dish with good cooking techniques and thoughtful preparation
3. Structure clear cooking methods with proper technique guidance
4. Create detailed instructions with timing, temperatures, and helpful tips
5. Always respond in the same language the user is using
</INSTRUCTIONS>

<CONTEXT>
The recipe must fit into one of these meal categories: breakfast, lunch, dinner, or snacks.
</CONTEXT>

<CONSTRAINTS>
Requirements:
- Create flavorful dishes with multiple components and layered tastes
- Use a mix of accessible and quality specialty ingredients when beneficial
- Include proper cooking techniques (searing, braising, reduction, etc.)
- Provide precise measurements, temperatures, and timing guidance
- Include technique explanations and helpful cooking tips
- Allow reasonable preparation times (30 minutes to 2 hours typically)
- Be very detailed, elaborate and specific when describing the instruction steps. 

Avoid:
- Overly simple single-step preparations
- Using only basic ingredients when better options would improve the dish
- Skipping important technique details
- Vague measurements or instructions
- Unreasonably complex molecular gastronomy techniques
- Ingredients that are extremely difficult to source
</CONSTRAINTS>

<CRITICAL_JSON_FORMATTING>
IMPORTANT: You must generate valid JSON. Follow these rules strictly:
- All "amount" values MUST be decimal numbers (e.g., 0.5, 1.5, 2.0)
- NEVER use fractions like 1/2 - convert to decimals: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75
- All strings must be properly quoted
- No trailing commas
- "dishType" must be exactly one of: "breakfast", "lunch", "dinner", or "snacks"
- "error" should be null
- "image" should be null
</CRITICAL_JSON_FORMATTING>

<OUTPUT_EXAMPLE>
Here's the exact JSON structure you must follow:
{
  "title": "Recipe Title Here",
  "summary": "Brief description here",
  "servings": 4,
  "readyInMinutes": 45,
  "categories": ["category1", "category2"],
  "instructions": {
    "steps": [
      {
        "number": 1,
        "step": "First step description"
      }
    ]
  },
  "ingredients": [
    {
      "name": "ingredient name",
      "measures": {
        "amount": 1.5,
        "unit": "the unit of measurement for the ingredient based on the user's locale"
      }
    }
  ],
  "dishType": "dinner",
  "error": null,
  "image": null
}
</OUTPUT_EXAMPLE>

Create a detailed, well-crafted recipe from the description "${description}". Focus on good technique, quality ingredients, and clear instruction. Always respond in the user's language and default beverages/smoothies to snacks category.

REMEMBER: Use only decimal numbers for amounts (0.25, 0.5, 1.0, 2.5, etc.) - never fractions like 1/2.`,
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

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 },
    );
  }
}
