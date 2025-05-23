import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

interface UseDinnerRecipesProps {
  menuId?: Id<"menus">;
}

export const useDinnerRecipes = ({ menuId }: UseDinnerRecipesProps = {}) => {
  const { user } = useUser();
  const userId = user?.id || "";

  const {
    data: dinnerRecipes,
    isLoading,
    isError,
  } = useQuery({
    ...convexQuery(
      menuId ? api.menus.getMenuDinnerRecipes : api.recipes.getDinnerRecipes,
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

  return { dinnerRecipes, isLoading, isError };
};
