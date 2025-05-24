import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

interface UseBreakfastRecipesProps {
  menuId?: Id<"menus">;
}

export const useBreakfastRecipes = ({
  menuId,
}: UseBreakfastRecipesProps = {}) => {
  const { user } = useUser();
  const userId = user?.id || "";

  const {
    data: breakfastRecipes,
    isLoading,
    isError,
  } = useQuery({
    ...convexQuery(
      menuId
        ? api.menus.getMenuBreakfastRecipes
        : api.recipes.getBreakfastRecipes,
      menuId
        ? {
            userId,
            menuId,
            paginationOpts: {
              numItems: 6,
              cursor: null,
            },
          }
        : {
            userId,
            paginationOpts: {
              numItems: 6,
              cursor: null,
            },
          },
    ),
  });

  return { breakfastRecipes, isLoading, isError };
};
