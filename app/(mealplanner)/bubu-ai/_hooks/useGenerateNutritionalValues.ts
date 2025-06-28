import {
  generateNutritionalValuesSchema,
  type GenerateNutritionalValuesInput,
} from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";

interface NutritionalValuesResponse {
  calories?: number;
  protein?: number;
  totalFat?: number;
  saturatedFat?: number;
  unsaturatedFat?: number;
  totalCarbohydrates?: number;
  sugars?: number;
  cholesterol?: number;
  sodium?: number;
  error?: string;
}

export const useGenerateNutritionalValues = () => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateNutritionalValuesMutation = useMutation({
    mutationFn: async (
      input: GenerateNutritionalValuesInput,
    ): Promise<NutritionalValuesResponse> => {
      const validatedInput = generateNutritionalValuesSchema.parse(input);

      abortControllerRef.current = new AbortController();

      const response = await fetch("/api/ai/nutritional-values", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedInput),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `HTTP error! status: ${response.status}`,
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["generate-nutritional-values"], data);
    },
    onError: (error) => {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error generating nutritional values:", error);
        toast.error("Failed to generate nutritional values");
      }
    },
  });

  const generateNutritionalValues = async (
    ingredients: Array<{
      name: string;
      measures: { amount: number; unit: string };
    }>,
    servings: number,
  ) => {
    queryClient.setQueryData(["generate-nutritional-values"], null);

    try {
      const formattedIngredients = ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.measures.amount,
        unit: ingredient.measures.unit,
      }));

      await generateNutritionalValuesMutation.mutateAsync({
        ingredients: formattedIngredients,
        servings,
      });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error generating nutritional values:", error);
        throw error;
      }
    }
  };

  const abort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  return {
    generateNutritionalValuesMutation,
    generateNutritionalValues,
    abort,
    isGeneratingNutritionalValues: generateNutritionalValuesMutation.isPending,
  };
};
