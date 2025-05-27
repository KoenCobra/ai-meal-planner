"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DeleteRecipeDialog from "../_components/DeleteRecipeDialog";
import { RecipeGrid } from "../recipes/_components/RecipeGrid";
import { useRecipeDelete } from "../recipes/_hooks/useRecipeDelete";
import { useSearch } from "./_context/SearchContext";
import { useInfiniteSearch } from "./_hooks/useInfiniteSearch";

const SearchPage = () => {
  const router = useRouter();

  const {
    recipeToDelete,
    setRecipeToDelete,
    handleDelete,
    handleConfirmDelete,
  } = useRecipeDelete({});

  const { searchQuery, setSearchQuery, clearSearch } = useSearch();
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { recipes, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteSearch({
      searchQuery: debouncedQuery || "",
      itemsPerPage: 6,
    });

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

      <DeleteRecipeDialog
        open={!!recipeToDelete}
        onOpenChange={(open) => !open && setRecipeToDelete(null)}
        onConfirm={handleConfirmDelete}
        recipeName={recipeToDelete?.title || ""}
      />
    </div>
  );
};

export default SearchPage;
