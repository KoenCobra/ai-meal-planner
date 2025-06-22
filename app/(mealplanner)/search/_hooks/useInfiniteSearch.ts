import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
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
  itemsPerPage = 8,
}: UseInfiniteSearchProps) => {
  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  const {
    data: cachedResults,
    isLoading: isCacheLoading,
    isFetching: isCacheFetching,
  } = useQuery({
    ...convexQuery(api.recipes.searchRecipesByTitleIngredientsAndCategories, {
      query: trimmedQuery,
      paginationOpts: { numItems: itemsPerPage, cursor: null },
    }),
    enabled: !!trimmedQuery,
  }) as {
    data: PaginationResult<Doc<"recipes">> | undefined;
    isLoading: boolean;
    isFetching: boolean;
  };

  const results = usePaginatedQuery(
    api.recipes.searchRecipesByTitleIngredientsAndCategories,
    trimmedQuery !== ""
      ? {
          query: trimmedQuery,
        }
      : "skip",
    { initialNumItems: itemsPerPage },
  );

  const recipes = useMemo(() => {
    const paginatedResults = results.results || [];
    const cached = cachedResults?.page || [];

    if (cached.length > 0 && results.status === "LoadingFirstPage") {
      return cached;
    }

    if (paginatedResults.length > cached.length) {
      return paginatedResults;
    }

    return paginatedResults.length > 0 ? paginatedResults : cached;
  }, [cachedResults?.page, results.results, results.status]);

  const hasNextPage = results.status === "CanLoadMore";
  const isFetchingNextPage = results.status === "LoadingMore";

  const isLoading =
    results.status === "LoadingFirstPage" &&
    (!cachedResults?.page || cachedResults.page.length === 0) &&
    isCacheLoading;

  const isError = false;

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
    isCacheFetching,
    hasCachedData: !!cachedResults?.page && cachedResults.page.length > 0,
  };
};
