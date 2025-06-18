import { sanitizeInput } from "@/lib/utils";
import { GenerateRecipeInput, RecipeInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export const useGenerateRecipe = () => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
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

      const data = await response.json();

      abortControllerRef.current = null;

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<RecipeInput>(["generate-recipe"], data);
    },
  });

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return {
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    abort,
  };
};
