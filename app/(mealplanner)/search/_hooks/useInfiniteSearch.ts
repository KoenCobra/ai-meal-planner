import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { usePaginatedQuery } from "convex/react";
import type { PaginationResult } from "convex/server";
import { useMemo } from "react";

interface UseInfiniteSearchProps {
  searchQuery: string;
  itemsPerPage?: number;
}

export const useInfiniteSearch = ({
  searchQuery,
  itemsPerPage = 6,
}: UseInfiniteSearchProps) => {
  const { user } = useUser();
  const userId = user?.id || "";

  // Debounced query to avoid too many API calls
  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  // TanStack Query for caching search results
  const {
    data: cachedResults,
    isLoading: isCacheLoading,
    isFetching: isCacheFetching,
  } = useQuery({
    ...convexQuery(api.recipes.searchRecipesByTitleAndIngredients, {
      userId,
      query: trimmedQuery,
      paginationOpts: { numItems: itemsPerPage, cursor: null },
    }),
  }) as {
    data: PaginationResult<Doc<"recipes">> | undefined;
    isLoading: boolean;
    isFetching: boolean;
  };

  // Paginated query for infinite loading
  const paginatedResults = usePaginatedQuery(
    api.recipes.searchRecipesByTitleAndIngredients,
    userId && trimmedQuery !== undefined
      ? { userId, query: trimmedQuery }
      : "skip",
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
    isCacheFetching, // Shows when cache is updating in background
    hasCachedData: cachedRecipes.length > 0,
  };
};
