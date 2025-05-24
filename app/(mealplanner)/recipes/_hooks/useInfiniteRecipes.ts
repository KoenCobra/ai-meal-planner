import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react";

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

interface UseInfiniteRecipesProps {
  mealType: MealType;
  menuId?: Id<"menus">;
  itemsPerPage?: number;
}

const getMealTypeQuery = (mealType: MealType, isMenu: boolean) => {
  if (isMenu) {
    switch (mealType) {
      case "breakfast":
        return api.menus.getMenuBreakfastRecipes;
      case "lunch":
        return api.menus.getMenuLunchRecipes;
      case "dinner":
        return api.menus.getMenuDinnerRecipes;
      case "snacks":
        return api.menus.getMenuSnackRecipes;
      default:
        throw new Error(`Unknown meal type: ${mealType}`);
    }
  } else {
    switch (mealType) {
      case "breakfast":
        return api.recipes.getBreakfastRecipes;
      case "lunch":
        return api.recipes.getLunchRecipes;
      case "dinner":
        return api.recipes.getDinnerRecipes;
      case "snacks":
        return api.recipes.getSnackRecipes;
      default:
        throw new Error(`Unknown meal type: ${mealType}`);
    }
  }
};

export const useInfiniteRecipes = ({
  mealType,
  menuId,
  itemsPerPage = 6,
}: UseInfiniteRecipesProps) => {
  const { user } = useUser();
  const convex = useConvex();
  const userId = user?.id || "";

  const queryFn = getMealTypeQuery(mealType, !!menuId);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [
      "recipes",
      mealType,
      menuId ? "menu" : "all",
      menuId,
      userId,
      itemsPerPage,
    ],
    queryFn: async ({ pageParam }) => {
      if (!convex) throw new Error("Convex client not available");

      const args = menuId
        ? {
            userId,
            menuId,
            paginationOpts: {
              numItems: itemsPerPage,
              cursor: pageParam || null,
            },
          }
        : {
            userId,
            paginationOpts: {
              numItems: itemsPerPage,
              cursor: pageParam || null,
            },
          };

      return await convex.query(queryFn, args);
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      return lastPage?.isDone ? undefined : lastPage?.continueCursor;
    },
  });

  // Flatten all pages into a single array
  const recipes = data?.pages.flatMap((page) => page?.page || []) || [];

  return {
    recipes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
};
