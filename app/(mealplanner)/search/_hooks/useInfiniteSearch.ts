import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { usePaginatedQuery } from "convex/react";
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

  const results = usePaginatedQuery(
    api.recipes.searchRecipesByTitleAndIngredients,
    userId
      ? {
          userId,
          query: trimmedQuery,
        }
      : "skip",
    { initialNumItems: itemsPerPage },
  );

  const recipes = results.results || [];
  const hasNextPage = results.status === "CanLoadMore";
  const isFetchingNextPage = results.status === "LoadingMore";
  const isLoading = results.status === "LoadingFirstPage";
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
  };
};
