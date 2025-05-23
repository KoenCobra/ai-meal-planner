import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

export const useLunchRecipes = () => {
  const { user } = useUser();
  const userId = user?.id || "";

  const {
    data: lunchRecipes,
    isLoading,
    isError,
  } = useQuery({
    ...convexQuery(api.recipes.getLunchRecipes, {
      userId,
      paginationOpts: {
        numItems: 20,
        cursor: null,
      },
    }),
  });

  return { lunchRecipes, isLoading, isError };
};
