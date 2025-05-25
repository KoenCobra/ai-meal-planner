import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { usePaginatedQuery } from "convex/react";

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

interface UseInfiniteRecipesProps {
  mealType: MealType;
  menuId?: Id<"menus">;
  itemsPerPage?: number;
}

const getMealTypeQuery = (mealType: MealType, isMenu: boolean) => {
  if (isMenu) {
    return api.menus.getMenuRecipesByDishType;
  } else {
    return api.recipes.getRecipesByDishType;
  }
};

export const useInfiniteRecipes = ({
  mealType,
  menuId,
  itemsPerPage = 6,
}: UseInfiniteRecipesProps) => {
  const { user } = useUser();
  const userId = user?.id || "";

  const queryFn = getMealTypeQuery(mealType, !!menuId);

  const args = menuId
    ? {
        userId,
        menuId,
        dishType: mealType,
      }
    : {
        userId,
        dishType: mealType,
      };

  const {
    results: recipes,
    status,
    loadMore,
    isLoading,
  } = usePaginatedQuery(queryFn, args, { initialNumItems: itemsPerPage });

  const fetchNextPage = () => {
    if (status === "CanLoadMore") {
      loadMore(itemsPerPage);
    }
  };

  const hasNextPage = status === "CanLoadMore";
  const isFetchingNextPage = status === "LoadingMore";
  const isError = false; // Convex handles errors differently

  return {
    recipes: recipes || [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
};
