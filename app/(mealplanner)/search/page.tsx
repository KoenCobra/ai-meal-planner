"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sanitizeInput } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChefHat, Loader2, SearchIcon, X } from "lucide-react";
import { useEffect, useRef } from "react";
import DeleteRecipeDialog from "../_components/DeleteRecipeDialog";
import { RecipeGrid } from "../recipes/_components/RecipeGrid";
import { useRecipeDelete } from "../recipes/_hooks/useRecipeDelete";
import { useSearch } from "./_context/SearchContext";
import { useInfiniteSearch } from "./_hooks/useInfiniteSearch";

const SearchPage = () => {
  const {
    recipeToDelete,
    setRecipeToDelete,
    handleDelete,
    handleConfirmDelete,
  } = useRecipeDelete({});

  const {
    searchQuery,
    setSearchQuery,
    clearSearch,
    executeSearch,
    executedQuery,
  } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { recipes, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteSearch({
      searchQuery: executedQuery || "",
      // In a real app, you would pass sortBy and activeTab as parameters
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5, rootMargin: "700px" },
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

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      executeSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Recipe Search</h1>
          <p className="text-muted-foreground">
            Find the perfect recipe for any occasion
          </p>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex  gap-3">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <SearchIcon className="size-4" />
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search recipes by title, ingredients, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(sanitizeInput(e.target.value))}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-10 h-12 text-base"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSearchSubmit}
              disabled={!searchQuery.trim() || isLoading}
              className="h-12 px-6"
              variant="outline"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin mr-2" />
              ) : (
                <SearchIcon className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Active Filters */}
      {executedQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="text-sm font-medium">Results for:</div>
          <div className="flex gap-2 flex-wrap">
            <div className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center gap-1">
              &quot;{executedQuery}&quot;
            </div>
          </div>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence mode="wait">
        {isLoading && executedQuery && !recipes.length ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="relative h-16 w-16 mb-4">
              <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <p className="text-lg font-medium">Searching recipes...</p>
            <p className="text-sm text-muted-foreground">
              This may take a moment
            </p>
          </motion.div>
        ) : executedQuery && recipes.length === 0 && !isLoading ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 max-w-md mx-auto"
          >
            <div className="bg-muted rounded-full p-4 inline-flex mb-4">
              <SearchIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find any recipes matching &quot;{executedQuery}
              &quot;. Try different keywords or browse our recipe collections.
            </p>
            <Button variant="outline" onClick={clearSearch}>
              Clear Search
            </Button>
          </motion.div>
        ) : !executedQuery ? (
          <motion.div
            key="start-search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="bg-primary/10 rounded-full p-6 inline-flex mb-6">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Find Your Next Meal</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Search for recipes by name, ingredients, or categories. Try
              searching for &quot;pasta&quot;, &quot;vegetarian&quot;, or
              &quot;quick dinner&quot;.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Found {recipes.length} recipe{recipes.length === 1 ? "" : "s"}
              </p>
            </div>

            <RecipeGrid recipes={recipes} onDelete={handleDelete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="mt-8">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading more recipes...</span>
          </div>
        )}

        {!hasNextPage && recipes.length > 0 && !isFetchingNextPage && (
          <div className="text-center py-6 text-muted-foreground">
            You&apos;ve reached the end of the results
          </div>
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
