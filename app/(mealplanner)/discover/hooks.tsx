import { RecipeDetail, DiscoverRecipeItem } from "@/app/types/recipe";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useRecipe = (id: string) => {
  const { data, isError, isLoading } = useQuery<RecipeDetail>({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `recipes/${id}/information?includeNutrition=true&addWinePairing=false&addTasteData=false`,
      );
      return res.data;
    },
    staleTime: Infinity,
  });
  return { data, isError, isLoading };
};

export const useRecipeCarousel = (dishType: string) => {
  const { data, isError, isLoading } = useQuery<DiscoverRecipeItem>({
    queryKey: ["discover", dishType],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `recipes/random?number=3&include-tags=${dishType}&includeNutrition=false`,
      );
      return res.data;
    },
    staleTime: Infinity,
  });
  return { data, isError, isLoading };
};
