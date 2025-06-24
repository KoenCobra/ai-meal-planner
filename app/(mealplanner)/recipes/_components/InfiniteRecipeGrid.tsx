"use client";

import type { Id } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInfiniteRecipes } from "../_hooks/useInfiniteRecipes";
import { EmptyState } from "./EmptyState";
import { RecipeGrid } from "./RecipeGrid";

type MealType = "breakfast" | "lunch" | "dinner" | "other";

interface InfiniteRecipeGridProps {
  mealType: MealType;
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

function RecipeGridSkeleton() {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export const InfiniteRecipeGrid = ({
  mealType,
  menuId,
  onDelete,
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
      { threshold: 0.2, rootMargin: "600px" },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <RecipeGridSkeleton />;
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
    <div className="animate-in fade-in duration-500">
      <RecipeGrid recipes={recipes} onDelete={onDelete} menuId={menuId} />

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="mt-8">
        {isFetchingNextPage && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading more recipes...</span>
          </div>
        )}

        {!hasNextPage && recipes.length > 0 && !isFetchingNextPage && (
          <div className="text-center py-4 text-muted-foreground">
            No more recipes to load
          </div>
        )}
      </div>
    </div>
  );
};
