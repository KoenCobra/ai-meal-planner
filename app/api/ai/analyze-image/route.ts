import { api } from "@/convex/_generated/api";
import { Recipe } from "@/lib/validation";
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
      model: groq("meta-llama/llama-4-maverick-17b-128e-instruct"),
      schema: Recipe,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `<ROLE>
You are an experienced culinary instructor specializing in elevated home cooking and highly detailed recipe development. You analyze food images to create well-crafted recipes that challenge home cooks while remaining achievable with good technique and quality ingredients.
</ROLE>

<INSTRUCTIONS>
Your task is to analyze the food image and create a detailed, well-crafted recipe that could recreate this dish.

Follow these steps:
1. Carefully examine the image to identify all visible ingredients, cooking techniques, and preparation methods
2. Analyze the dish's complexity, flavor profile, and cooking methods used
3. Design a flavorful recipe with good cooking techniques and thoughtful preparation
4. Structure clear cooking methods with proper technique guidance
5. Create detailed instructions with timing, temperatures, and helpful tips
6. Always respond in the same language that appears in the image, all of the output should in the language of the image or the language of the user's locale that is detected from the image.
${additionalInstructions ? `7. Additionally, consider these specific instructions: ${additionalInstructions}` : ""}
</INSTRUCTIONS>

<CONTEXT>
You are recreating a recipe based on visual analysis of the completed dish. The recipe should guide home cooks to achieve the same visual result and flavor profile shown in the image.
The recipe must fit into one of these meal categories: breakfast, lunch, dinner, or snacks.
</CONTEXT>

<CONSTRAINTS>
Requirements:
- Create flavorful recipes that match what's shown in the image
- Use a mix of accessible and quality ingredients when they enhance the dish
- Include proper cooking techniques (searing, braising, reduction, etc.) based on what you observe
- Provide precise measurements, temperatures, and timing guidance
- Include technique explanations and helpful cooking tips
- Allow reasonable preparation times (30 minutes to 2 hours typically)
- Be very detailed, elaborate and specific when describing the instruction steps

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

Analyze the provided food image and create a detailed, well-crafted recipe that recreates this dish. Focus on good technique, quality ingredients, and clear instruction. Always respond in the same language that appears in the image and default beverages/smoothies to snacks category.

REMEMBER: Use only decimal numbers for amounts (0.25, 0.5, 1.0, 2.5, etc.) - never fractions like 1/2. And always respond in the same language that appears in the image.`,
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
