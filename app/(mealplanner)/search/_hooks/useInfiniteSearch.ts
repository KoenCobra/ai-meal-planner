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
  itemsPerPage = 3,
}: UseInfiniteSearchProps) => {
  const { user } = useUser();
  const userId = user?.id || "";

  // Debounced query to avoid too many API calls
  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  // Use TanStack Query for caching search results
  // This provides instant results from cache while updating in background
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

  // Use usePaginatedQuery for infinite loading functionality
  const results = usePaginatedQuery(
    api.recipes.searchRecipesByTitleAndIngredients,
    userId && trimmedQuery !== undefined
      ? {
          userId,
          query: trimmedQuery,
        }
      : "skip",
    { initialNumItems: itemsPerPage },
  );

  // Smart recipe selection: use cached data for better UX
  const recipes = useMemo(() => {
    const paginatedResults = results.results || [];
    const cached = cachedResults?.page || [];

    // If we have cached results and are still loading first page
    if (cached.length > 0 && results.status === "LoadingFirstPage") {
      return cached;
    }

    // If paginated has more results than cache, use paginated
    if (paginatedResults.length > cached.length) {
      return paginatedResults;
    }

    // For empty states, prefer showing any available data
    return paginatedResults.length > 0 ? paginatedResults : cached;
  }, [cachedResults?.page, results.results, results.status]);

  const hasNextPage = results.status === "CanLoadMore";
  const isFetchingNextPage = results.status === "LoadingMore";

  // Improved loading state: only show loading if we have no cached data
  const isLoading =
    results.status === "LoadingFirstPage" &&
    (!cachedResults?.page || cachedResults.page.length === 0) &&
    isCacheLoading;

  const isError = false; // Convex queries don't have error states like this

  const fetchNextPage = () => {
    if (hasNextPage) {
      results.loadMore(itemsPerPage);
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
    isCacheFetching, // Shows when cache is updating in background
    hasCachedData: !!cachedResults?.page && cachedResults.page.length > 0,
  };
};
