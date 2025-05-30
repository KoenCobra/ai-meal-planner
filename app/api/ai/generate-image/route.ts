import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fal } from "@fal-ai/client";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Parse request body
    const { recipeTitle, recipeDescription } = await req.json();

    if (!recipeTitle || !recipeDescription) {
      return NextResponse.json(
        { error: "Recipe title and description are required" },
        { status: 400 },
      );
    }

    // Check rate limits
    const rateLimitCheck = await convex.mutation(
      api.openaiRateLimit.checkImageGenerationLimit,
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

    // Create AbortController for FAL API call
    const abortController = new AbortController();

    // Forward abort signal
    req.signal.addEventListener("abort", () => {
      abortController.abort();
    });

    // Generate image
    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: `Professional food photography of ${recipeTitle}. ${recipeDescription}.Super high def 4K quality, and detailed.`,
        image_size: "square_hd",
      },
    });

    return NextResponse.json(
      { imageUrl: result.data.images[0].url },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request cancelled" }, { status: 499 });
    }

    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}
