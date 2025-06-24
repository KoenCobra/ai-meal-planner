import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { usePaginatedQuery } from "convex/react";
import type { PaginationResult } from "convex/server";
import { useMemo } from "react";

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
  // TanStack Query caching for menu recipes
  const {
    data: cachedMenuResults,
    isLoading: isMenuCacheLoading,
    isFetching: isMenuCacheFetching,
  } = useQuery({
    ...convexQuery(
      api.menus.getMenuRecipesByDishType,
      menuId
        ? {
            menuId,
            dishType: mealType,
            paginationOpts: { numItems: itemsPerPage, cursor: null },
          }
        : "skip", // This won't be used due to enabled condition
    ),
    enabled: !!menuId,
  }) as {
    data: PaginationResult<Doc<"recipes">> | undefined;
    isLoading: boolean;
    isFetching: boolean;
  };

  // TanStack Query caching for regular recipes
  const {
    data: cachedRecipeResults,
    isLoading: isRecipeCacheLoading,
    isFetching: isRecipeCacheFetching,
  } = useQuery({
    ...convexQuery(api.recipes.getRecipesByDishType, {
      dishType: mealType,
      paginationOpts: { numItems: itemsPerPage, cursor: null },
    }),
    enabled: !menuId,
  }) as {
    data: PaginationResult<Doc<"recipes">> | undefined;
    isLoading: boolean;
    isFetching: boolean;
  };

  // For menu recipes
  const menuResults = usePaginatedQuery(
    api.menus.getMenuRecipesByDishType,
    menuId
      ? {
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
          dishType: mealType,
        }
      : "skip",
    { initialNumItems: itemsPerPage },
  );

  // Use the appropriate result set based on whether we have a menuId
  const activeResults = menuId ? menuResults : recipeResults;
  const activeCachedResults = menuId ? cachedMenuResults : cachedRecipeResults;
  const activeCacheLoading = menuId ? isMenuCacheLoading : isRecipeCacheLoading;

  // Smart recipe selection: use cached data for better UX
  const recipes = useMemo(() => {
    const paginatedResults = activeResults.results || [];
    const cached = activeCachedResults?.page || [];

    // If we have cached results and are still loading first page
    if (cached.length > 0 && activeResults.status === "LoadingFirstPage") {
      return cached;
    }

    // If paginated has more results than cache, use paginated
    if (paginatedResults.length > cached.length) {
      return paginatedResults;
    }

    // For empty states, prefer showing any available data
    return paginatedResults.length > 0 ? paginatedResults : cached;
  }, [activeCachedResults?.page, activeResults.results, activeResults.status]);

  const hasNextPage = activeResults.status === "CanLoadMore";
  const isFetchingNextPage = activeResults.status === "LoadingMore";

  // Improved loading state: only show loading if we have no cached data
  const isLoading =
    activeResults.status === "LoadingFirstPage" &&
    (!activeCachedResults?.page || activeCachedResults.page.length === 0) &&
    activeCacheLoading;

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
    // Additional useful states
    isCacheFetching: menuId ? isMenuCacheFetching : isRecipeCacheFetching,
    hasCachedData:
      !!activeCachedResults?.page && activeCachedResults.page.length > 0,
  };
};
