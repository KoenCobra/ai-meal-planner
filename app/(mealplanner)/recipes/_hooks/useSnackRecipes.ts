import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

interface UseSnackRecipesProps {
  menuId?: Id<"menus">;
}

export const useSnackRecipes = ({ menuId }: UseSnackRecipesProps = {}) => {
  const { user } = useUser();
  const userId = user?.id || "";

  const {
    data: snackRecipes,
    isLoading,
    isError,
  } = useQuery({
    ...convexQuery(
      menuId ? api.menus.getMenuSnackRecipes : api.recipes.getSnackRecipes,
      menuId
        ? {
            userId,
            menuId,
            paginationOpts: {
              numItems: 20,
              cursor: null,
            },
          }
        : {
            userId,
            paginationOpts: {
              numItems: 20,
              cursor: null,
            },
          },
    ),
  });

  return { snackRecipes, isLoading, isError };
};
