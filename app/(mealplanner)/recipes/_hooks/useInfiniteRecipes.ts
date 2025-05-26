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

export const useInfiniteRecipes = ({
  mealType,
  menuId,
  itemsPerPage = 6,
}: UseInfiniteRecipesProps) => {
  const { user } = useUser();
  const userId = user?.id || "";

  // For menu recipes
  const menuResults = usePaginatedQuery(
    api.menus.getMenuRecipesByDishType,
    menuId
      ? {
          userId,
          menuId,
          dishType: mealType,
        }
      : "skip",
    { initialNumItems: itemsPerPage },
  );

  // For all recipes
  const recipeResults = usePaginatedQuery(
    api.recipes.getRecipesByDishType,
    !menuId
      ? {
          userId,
          dishType: mealType,
        }
      : "skip",
    { initialNumItems: itemsPerPage },
  );

  // Use the appropriate result set based on whether we have a menuId
  const activeResults = menuId ? menuResults : recipeResults;

  const recipes = activeResults.results || [];
  const hasNextPage = activeResults.status === "CanLoadMore";
  const isFetchingNextPage = activeResults.status === "LoadingMore";
  const isLoading = activeResults.status === "LoadingFirstPage";
  const isError = false; // Convex queries don't have error states like this

  const fetchNextPage = () => {
    if (hasNextPage) {
      activeResults.loadMore(itemsPerPage);
    }
  };

  return {
    recipes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
};
