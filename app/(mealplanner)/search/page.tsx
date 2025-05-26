"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { RecipeGrid } from "../recipes/_components/RecipeGrid";
import { useSearch } from "./_context/SearchContext";
import { useDeleteRecipe } from "./_hooks/useDeleteRecipe";
import { useInfiniteSearch } from "./_hooks/useInfiniteSearch";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { searchQuery, setSearchQuery, clearSearch } = useSearch();
  const [debouncedQuery, setDebouncedQuery] = useState(
    searchQuery || initialQuery,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Initialize context with URL query parameter
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery, setSearchQuery]);

  // Debounce search query for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      // Update URL without causing navigation
      if (searchQuery.trim()) {
        window.history.replaceState(
          {},
          "",
          `/search?q=${encodeURIComponent(searchQuery.trim())}`,
        );
      } else {
        window.history.replaceState({}, "", "/search");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { recipes, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteSearch({
      searchQuery: debouncedQuery,
      itemsPerPage: 6,
    });

  const { deleteRecipe } = useDeleteRecipe();

  // Auto-load more when scrolling near the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5, rootMargin: "600px" },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleDelete = useCallback(
    (recipeId: Id<"recipes">, title: string, dishType: string) => {
      deleteRecipe(recipeId, title, dishType);
    },
    [deleteRecipe],
  );

  const handleClearSearch = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Search Recipes</h1>
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            Back
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search recipes by title or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
            autoFocus
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search Info */}
        {debouncedQuery && (
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Searching..."
              : `Found ${recipes.length} recipe${recipes.length === 1 ? "" : "s"} for "${debouncedQuery}"`}
          </p>
        )}
      </div>

      {/* Results */}
      <div>
        {isLoading && debouncedQuery && !recipes.length ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Searching recipes...</span>
          </div>
        ) : debouncedQuery && recipes.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground">
              Try searching with different keywords or ingredients
            </p>
          </div>
        ) : !debouncedQuery ? (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start searching</h3>
            <p className="text-muted-foreground">
              Type in the search box above to find recipes by title or
              ingredients
            </p>
          </div>
        ) : (
          <>
            <RecipeGrid recipes={recipes} onDelete={handleDelete} />

            {/* Load more trigger */}
            <div ref={loadMoreRef} className="mt-8">
              {isFetchingNextPage && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading more recipes...</span>
                </div>
              )}

              {!hasNextPage && recipes.length > 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No more recipes to load
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
