import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useClearAiCache } from "../utils/clearAiCache";

export const useGenerateImage = () => {
  const { clearAiCache } = useClearAiCache();
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateImageMutation = useMutation({
    mutationFn: async ({
      recipeTitle,
      recipeSummary,
    }: {
      recipeTitle: string;
      recipeSummary: string;
    }) => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const response = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeTitle, recipeSummary }),
        signal: abortController.signal,
      });

      abortControllerRef.current = null;

      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["generate-image"], data.imageUrl);
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
    generateImageMutation,
    abort,
  };
};
