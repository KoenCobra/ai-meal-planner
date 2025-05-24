"use client";

import { Id } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInfiniteRecipes } from "../_hooks/useInfiniteRecipes";
import { EmptyState } from "./EmptyState";
import { RecipeGrid } from "./RecipeGrid";

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

interface InfiniteRecipeGridProps {
  mealType: MealType;
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
  itemsPerPage?: number;
}

export const InfiniteRecipeGrid = ({
  mealType,
  menuId,
  onDelete,
  itemsPerPage = 6,
}: InfiniteRecipeGridProps) => {
  const {
    recipes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteRecipes({
    mealType,
    menuId,
    itemsPerPage,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading recipes...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading recipes</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <EmptyState
        mealType={mealType.charAt(0).toUpperCase() + mealType.slice(1)}
      />
    );
  }

  return (
    <div>
      <RecipeGrid recipes={recipes} onDelete={onDelete} />

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
    </div>
  );
};
