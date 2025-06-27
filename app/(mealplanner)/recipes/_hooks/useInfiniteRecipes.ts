import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react";

type MealType = "breakfast" | "lunch" | "dinner" | "other";

interface UseInfiniteRecipesProps {
  mealType: MealType;
  menuId?: Id<"menus">;
  itemsPerPage?: number;
}

export const useInfiniteRecipes = ({
  mealType,
  menuId,
  itemsPerPage = 8,
}: UseInfiniteRecipesProps) => {
  const convex = useConvex();

  const queryKey = menuId
    ? ["menu-recipes", menuId, mealType]
    : ["recipes", mealType];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      if (menuId) {
        return await convex.query(api.menus.getMenuRecipesByDishType, {
          menuId,
          dishType: mealType,
          paginationOpts: { numItems: itemsPerPage, cursor: pageParam },
        });
      } else {
        return await convex.query(api.recipes.getRecipesByDishType, {
          dishType: mealType,
          paginationOpts: { numItems: itemsPerPage, cursor: pageParam },
        });
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.isDone ? undefined : lastPage.continueCursor;
    },
    initialPageParam: null as string | null,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  // Flatten all pages into a single array of recipes
  const recipes = data?.pages.flatMap((page) => page.page) ?? [];

  return {
    recipes,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
};
