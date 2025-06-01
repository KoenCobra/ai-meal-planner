"use client";

import { sanitizeInput } from "@/lib/utils";
import { GenerateRecipeInput } from "@/lib/validation";

export function generateRecipeWithAbort(input: GenerateRecipeInput) {
  const controller = new AbortController();

  const sanitizedDescription = sanitizeInput(input.description);
  const sanitizedInput = {
    ...input,
    description: sanitizedDescription,
  };

  const response = fetch("/api/ai/generate-recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sanitizedInput),
    signal: controller.signal,
  }).then(async (response) => {
    if (!response.ok) {
      if (response.status === 499) {
        console.error(
          `generateRecipeWithAbort: ${response.statusText} ${response.status}`,
        );
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to generate recipe");
    }
    return response.json();
  });

  return { response, controller };
}

export function analyzeImageForRecipeWithAbort(
  image: File,
  additionalInstructions?: string,
) {
  const controller = new AbortController();

  const formData = new FormData();
  formData.append("image", image);
  if (additionalInstructions) {
    formData.append(
      "additionalInstructions",
      sanitizeInput(additionalInstructions),
    );
  }

  const response = fetch("/api/ai/analyze-image", {
    method: "POST",
    body: formData,
    signal: controller.signal,
  }).then(async (response) => {
    if (!response.ok) {
      if (response.status === 499) {
        console.error(
          `analyzeImageForRecipeWithAbort: ${response.statusText} ${response.status}`,
        );
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to analyze image");
    }
    return response.json();
  });

  return { response, controller };
}

export function generateRecipeImageWithAbort(
  recipeTitle: string,
  recipeDescription: string,
) {
  const controller = new AbortController();

  const response = fetch("/api/ai/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipeTitle,
      recipeDescription,
    }),
    signal: controller.signal,
  }).then(async (response) => {
    if (!response.ok) {
      if (response.status === 499) {
        console.error(
          `generateRecipeImageWithAbort: ${response.statusText} ${response.status}`,
        );
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to generate image");
    }
    const data = await response.json();
    return data.imageUrl;
  });

  return { response, controller };
}
