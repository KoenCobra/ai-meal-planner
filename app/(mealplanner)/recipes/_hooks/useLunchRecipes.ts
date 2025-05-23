import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

interface UseLunchRecipesProps {
  menuId?: Id<"menus">;
}

export const useLunchRecipes = ({ menuId }: UseLunchRecipesProps = {}) => {
  const { user } = useUser();
  const userId = user?.id || "";

  const {
    data: lunchRecipes,
    isLoading,
    isError,
  } = useQuery({
    ...convexQuery(
      menuId ? api.menus.getMenuLunchRecipes : api.recipes.getLunchRecipes,
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

  return { lunchRecipes, isLoading, isError };
};
