import { sanitizeInput } from "@/lib/utils";
import { RecipeInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useClearAiCache } from "../utils/clearAiCache";

export const useAnalyzeImage = () => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);
  const { clearAiCache } = useClearAiCache();

  const analyzeImageMutation = useMutation({
    mutationFn: async ({
      image,
      additionalInstructions,
    }: {
      image: File;
      additionalInstructions?: string;
    }) => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

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
    analyzeImageMutation,
    abort,
  };
};
