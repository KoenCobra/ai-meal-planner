"use client";

import { sanitizeInput } from "@/lib/utils";
import { GenerateRecipeInput, RecipeInput } from "@/lib/validation";

export async function generateRecipeWithAbort(
  input: GenerateRecipeInput,
  abortSignal?: AbortSignal,
): Promise<RecipeInput> {
  const sanitizedDescription = sanitizeInput(input.description);
  const sanitizedInput = {
    ...input,
    description: sanitizedDescription,
  };

  const response = await fetch("/api/ai/generate-recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sanitizedInput),
    signal: abortSignal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate recipe");
  }

  return response.json();
}

export async function analyzeImageForRecipeWithAbort(
  image: File,
  additionalInstructions?: string,
  abortSignal?: AbortSignal,
): Promise<RecipeInput> {
  const formData = new FormData();
  formData.append("image", image);
  if (additionalInstructions) {
    formData.append(
      "additionalInstructions",
      sanitizeInput(additionalInstructions),
    );
  }

  const response = await fetch("/api/ai/analyze-image", {
    method: "POST",
    body: formData,
    signal: abortSignal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to analyze image");
  }

  return response.json();
}

export async function generateRecipeImageWithAbort(
  recipeTitle: string,
  recipeDescription: string,
  abortSignal?: AbortSignal,
): Promise<string> {
  const response = await fetch("/api/ai/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeTitle,
      recipeDescription,
    }),
    signal: abortSignal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate image");
  }

  const data = await response.json();
  return data.imageUrl;
}
