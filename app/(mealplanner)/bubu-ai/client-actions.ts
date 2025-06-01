"use client";

import { sanitizeInput } from "@/lib/utils";
import { GenerateRecipeInput, RecipeInput } from "@/lib/validation";

async function executeRecipeGeneration(
  input: GenerateRecipeInput,
  signal: AbortSignal,
): Promise<RecipeInput> {
  const sanitizedDescription = sanitizeInput(input.description);
  const sanitizedInput = {
    ...input,
    description: sanitizedDescription,
  };

  const res = await fetch("/api/ai/generate-recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sanitizedInput),
    signal,
  });

  if (!res.ok) {
    if (res.status === 499) {
      console.error(`generateRecipeWithAbort: ${res.statusText} ${res.status}`);
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate recipe");
  }

  return res.json();
}

async function executeImageAnalysis(
  image: File,
  additionalInstructions: string | undefined,
  signal: AbortSignal,
): Promise<RecipeInput> {
  const formData = new FormData();
  formData.append("image", image);
  if (additionalInstructions) {
    formData.append(
      "additionalInstructions",
      sanitizeInput(additionalInstructions),
    );
  }

  const res = await fetch("/api/ai/analyze-image", {
    method: "POST",
    body: formData,
    signal,
  });

  if (!res.ok) {
    if (res.status === 499) {
      console.error(
        `analyzeImageForRecipeWithAbort: ${res.statusText} ${res.status}`,
      );
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to analyze image");
  }

  return res.json();
}

async function executeImageGeneration(
  recipeTitle: string,
  recipeDescription: string,
  signal: AbortSignal,
): Promise<string> {
  const res = await fetch("/api/ai/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeTitle,
      recipeDescription,
    }),
    signal,
  });

  if (!res.ok) {
    if (res.status === 499) {
      console.error(
        `generateRecipeImageWithAbort: ${res.statusText} ${res.status}`,
      );
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate image");
  }

  const data = await res.json();
  return data.imageUrl;
}

export function generateRecipeWithAbort(input: GenerateRecipeInput) {
  const controller = new AbortController();
  const response = executeRecipeGeneration(input, controller.signal);
  return { response, controller };
}

export function analyzeImageForRecipeWithAbort(
  image: File,
  additionalInstructions?: string,
) {
  const controller = new AbortController();
  const response = executeImageAnalysis(
    image,
    additionalInstructions,
    controller.signal,
  );
  return { response, controller };
}

export function generateRecipeImageWithAbort(
  recipeTitle: string,
  recipeDescription: string,
) {
  const controller = new AbortController();
  const response = executeImageGeneration(
    recipeTitle,
    recipeDescription,
    controller.signal,
  );
  return { response, controller };
}
