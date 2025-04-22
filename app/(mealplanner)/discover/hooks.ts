import { RecipeDetail, DiscoverRecipeItem } from "@/app/types/recipe";
import { useQuery } from "@tanstack/react-query";
import { getRecipeById, getRecipes } from "../actions";
import { useSchematicEntitlement } from "@schematichq/schematic-react";

export const useRecipe = (id: string) => {
  const { value: isFeatureEnabled, featureUsageExceeded } =
    useSchematicEntitlement("api-calls-to-spoonacular");

  const { data, isError, isLoading } = useQuery<RecipeDetail>({
    queryKey: ["recipe", id],
    queryFn: async () => {
      if (!isFeatureEnabled || featureUsageExceeded) return null;

      return await getRecipeById(id);
    },
    staleTime: Infinity,
  });
  return { data, isError, isLoading };
};

export const useRecipeCarousel = (dishType: string) => {
  const { value: isFeatureEnabled, featureUsageExceeded } =
    useSchematicEntitlement("api-calls-to-spoonacular");

  const { data, isError, isLoading } = useQuery<DiscoverRecipeItem>({
    queryKey: ["discover", dishType],
    queryFn: async () => {
      if (!isFeatureEnabled || featureUsageExceeded) return null;

      return await getRecipes(dishType);
    },
    staleTime: Infinity,
  });
  return { data, isError, isLoading };
};
