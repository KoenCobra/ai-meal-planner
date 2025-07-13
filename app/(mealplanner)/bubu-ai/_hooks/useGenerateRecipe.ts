import { api } from "@/convex/_generated/api";
import { sanitizeInput } from "@/lib/utils";
import {
  GenerateRecipeInput,
  PreferencesInput,
  RecipeInput,
} from "@/lib/validation";
import { convexQuery } from "@convex-dev/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useClearAiCache } from "../utils/clearAiCache";

export const useGenerateRecipe = () => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);
  const { clearAiCache } = useClearAiCache();

  const { data: preferences } = useQuery({
    ...convexQuery(api.preferences.getPreferences, {}),
  });

  const generateRecipeMutation = useMutation({
    mutationFn: async (input: GenerateRecipeInput) => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const sanitizedDescription = sanitizeInput(input.description);
      const sanitizedInput = {
        description: sanitizedDescription,
      };

      const filteredPreferences: Partial<PreferencesInput> = {};

      if (preferences?.diets && preferences.diets.length > 0) {
        filteredPreferences.diets = preferences.diets;
      }

      if (preferences?.allergies && preferences.allergies.length > 0) {
        filteredPreferences.allergies = preferences.allergies;
      }

      if (preferences?.preferences && preferences.preferences.length > 0) {
        filteredPreferences.preferences = preferences.preferences;
      }

      if (preferences?.servings && preferences.servings > 0) {
        filteredPreferences.servings = preferences.servings;
      }

      if (preferences?.readyInMinutes && preferences.readyInMinutes > 0) {
        filteredPreferences.readyInMinutes = preferences.readyInMinutes;
      }

      const sanitizedAdditionalInstructions = sanitizeInput(
        preferences?.additionalInstructions || "",
      );
      if (sanitizedAdditionalInstructions) {
        filteredPreferences.additionalInstructions =
          sanitizedAdditionalInstructions;
      }

      console.log(filteredPreferences);

      const response = await fetch("/api/ai/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...sanitizedInput,
          preferences: filteredPreferences,
        }),
        signal: abortController.signal,
      });

      abortControllerRef.current = null;

      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData<RecipeInput>(["generate-recipe"], data);
    },
  });

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      clearAiCache();
    }
  };

  return {
    generateRecipeMutation,
    abort,
  };
};
