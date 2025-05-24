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
            dishType: mealType,
            paginationOpts: {
              numItems: itemsPerPage,
              cursor: pageParam || null,
            },
          }
        : {
            userId,
            dishType: mealType,
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
