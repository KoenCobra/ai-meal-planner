import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { usePaginatedQuery } from "convex/react";
import type { PaginationResult } from "convex/server";

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

  // Determine query configuration based on menuId
  const isMenuQuery = !!menuId;
  const queryFn = isMenuQuery
    ? api.menus.getMenuRecipesByDishType
    : api.recipes.getRecipesByDishType;
  const queryArgs = isMenuQuery
    ? { userId, menuId: menuId!, dishType: mealType }
    : { userId, dishType: mealType };

  // TanStack Query caching
  const {
    data: cachedResults,
    isLoading: isCacheLoading,
    isFetching: isCacheFetching,
  } = useQuery({
    ...convexQuery(queryFn, {
      ...queryArgs,
      paginationOpts: { numItems: itemsPerPage, cursor: null },
    }),
    enabled: isMenuQuery ? !!menuId : !menuId,
  }) as {
    data: PaginationResult<Doc<"recipes">> | undefined;
    isLoading: boolean;
    isFetching: boolean;
  };

  // Paginated query
  const paginatedResults = usePaginatedQuery(
    queryFn,
    !!userId ? queryArgs : "skip",
    { initialNumItems: itemsPerPage },
  );

  // Smart recipe selection - inline logic instead of useMemo
  const paginatedRecipes = paginatedResults.results || [];
  const cachedRecipes = cachedResults?.page || [];

  const recipes = (() => {
    // If we have cached results and are still loading first page, show cached
    if (
      cachedRecipes.length > 0 &&
      paginatedResults.status === "LoadingFirstPage"
    ) {
      return cachedRecipes;
    }

    // If paginated has more results than cache, use paginated
    if (paginatedRecipes.length > cachedRecipes.length) {
      return paginatedRecipes;
    }

    // For empty states, prefer showing any available data
    return paginatedRecipes.length > 0 ? paginatedRecipes : cachedRecipes;
  })();

  const hasNextPage = paginatedResults.status === "CanLoadMore";
  const isFetchingNextPage = paginatedResults.status === "LoadingMore";

  // Improved loading state: only show loading if we have no cached data
  const isLoading =
    paginatedResults.status === "LoadingFirstPage" &&
    cachedRecipes.length === 0 &&
    isCacheLoading;

  const fetchNextPage = () => {
    if (hasNextPage) {
      paginatedResults.loadMore(itemsPerPage);
    }
  };

  return {
    recipes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError: false, // Convex queries don't have error states like this
    isCacheFetching,
    hasCachedData: cachedRecipes.length > 0,
  };
};
