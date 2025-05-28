import { google } from "@ai-sdk/google";
import { vertex } from "@ai-sdk/google-vertex";
import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";

export async function getTextModelBasedOnUserPlan() {
  const { has } = await auth();

  return has({ plan: "serious_sizzler" })
    ? google("gemini-2.5-flash-preview-05-20")
    : openai("gpt-4.1-mini");
}

export async function getImageModelBasedOnUserPlan() {
  const { has } = await auth();

  return has({ plan: "serious_sizzler" })
    ? vertex.image("imagen-3.0-generate-002")
    : openai.image("dall-e-3");
}
