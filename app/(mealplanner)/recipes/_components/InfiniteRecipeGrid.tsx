"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { Id } from "@/convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInfiniteRecipes } from "../_hooks/useInfiniteRecipes";
import { EmptyState } from "./EmptyState";
import { RecipeGrid } from "./RecipeGrid";

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

interface InfiniteRecipeGridProps {
  mealType: MealType;
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

function RecipeGridSkeleton() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            {/* Image placeholder */}
            <Skeleton className="w-full aspect-video" />

            <div className="p-4 space-y-3">
              {/* Title placeholder */}
              <Skeleton className="h-6 w-3/4" />

              {/* Description placeholder */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Tags/metadata placeholder */}
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
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
      { threshold: 0.5, rootMargin: "700px" },
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
      <RecipeGrid recipes={recipes} onDelete={onDelete} />

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
