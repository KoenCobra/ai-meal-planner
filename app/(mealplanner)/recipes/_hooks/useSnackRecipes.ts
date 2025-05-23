import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

export const useSnackRecipes = () => {
  const { user } = useUser();
  const userId = user?.id || "";

  const {
    data: snackRecipes,
    isLoading,
    isError,
  } = useQuery({
    ...convexQuery(api.recipes.getSnackRecipes, {
      userId,
      paginationOpts: {
        numItems: 20,
        cursor: null,
      },
    }),
  });

  return { snackRecipes, isLoading, isError };
};
