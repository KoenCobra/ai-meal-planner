import { api } from "@/convex/_generated/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { useMemo } from "react";

interface UseInfiniteSearchProps {
  searchQuery: string;
  itemsPerPage?: number;
}

export const useInfiniteSearch = ({
  searchQuery,
  itemsPerPage = 8,
}: UseInfiniteSearchProps) => {
  const convex = useConvex();
  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["search-recipes", trimmedQuery],
    queryFn: async ({ pageParam }) => {
      return await convex.query(
        api.recipes.searchRecipesByTitleIngredientsAndCategories,
        {
          query: trimmedQuery,
          paginationOpts: { numItems: itemsPerPage, cursor: pageParam },
        },
      );
    },
    getNextPageParam: (lastPage) => {
      return lastPage.isDone ? undefined : lastPage.continueCursor;
    },
    initialPageParam: null as string | null,
    enabled: !!trimmedQuery,
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
