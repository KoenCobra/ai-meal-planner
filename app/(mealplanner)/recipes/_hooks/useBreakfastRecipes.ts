import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

export const useBreakfastRecipes = () => {
  const { user } = useUser();
  const userId = user?.id || "";

  console.log("breakfast");

  const {
    data: breakfastRecipes,
    isLoading,
    isError,
  } = useQuery({
    ...convexQuery(api.recipes.getBreakfastRecipes, {
      userId,
      paginationOpts: {
        numItems: 20,
        cursor: null,
      },
    }),
  });

  return { breakfastRecipes, isLoading, isError };
};
