import { sanitizeInput } from "@/lib/utils";
import { GenerateRecipeInput, RecipeInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useClearAiCache } from "../utils/clearAiCache";

export const useGenerateRecipe = () => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);
  const { clearAiCache } = useClearAiCache();

  const generateRecipeMutation = useMutation({
    mutationFn: async (input: GenerateRecipeInput) => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const sanitizedDescription = sanitizeInput(input.description);
      const sanitizedInput = {
        description: sanitizedDescription,
      };

      const response = await fetch("/api/ai/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedInput),
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
