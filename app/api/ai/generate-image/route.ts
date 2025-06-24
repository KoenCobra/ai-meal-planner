import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fal } from "@fal-ai/client";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const { recipeTitle, recipeSummary } = await req.json();

    if (!recipeTitle || !recipeSummary) {
      return NextResponse.json(
        { error: "Recipe title and summary are required" },
        { status: 400 },
      );
    }

    // Check rate limits
    const rateLimitCheck = await convex.mutation(
      api.aiRateLimit.checkImageGenerationLimit,
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

    const abortController = new AbortController();

    req.signal.addEventListener("abort", () => {
      abortController.abort();
    });

    // Generate image
    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: `Professional food photography of ${recipeTitle}. ${recipeSummary}.Super high def 4K quality, and detailed.`,
        image_size: "square_hd",
      },
    });

    const imageUrl = result.data.images[0].url;

    // Fetch the generated image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Convert image to WebP format
    const webpBuffer = await sharp(imageBuffer)
      .webp({ quality: 60 })
      .toBuffer();

    // Convert WebP buffer to base64 for client
    const webpBase64 = `data:image/webp;base64,${webpBuffer.toString("base64")}`;

    // Generate blurred placeholder using the WebP buffer
    const { base64: blurDataURL } = await getPlaiceholder(imageBuffer, {
      size: 10, // Small size for a more blurred effect
    });

    return NextResponse.json(
      {
        imageUrl: webpBase64, // Return WebP as base64
        blurDataURL,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}
