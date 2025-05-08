"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";

interface RecipeImageProps {
  recipe: {
    _id: Id<"recipes">;
    title: string;
    storageId?: Id<"_storage">;
  };
  className?: string;
}

export const RecipeImage = ({ recipe, className }: RecipeImageProps) => {
  const { data: imageUrl } = useQuery({
    ...convexQuery(
      api.recipes.images.getImageUrl,
      recipe.storageId ? { storageId: recipe.storageId } : "skip",
    ),
    // Cache the result for 1 hour (3600000 ms)
    gcTime: 3600000,
    // Use stale data while revalidating
    staleTime: 3600000,
    // Disable refetching on window focus since Convex handles real-time updates
    refetchOnWindowFocus: false,
  });

  return (
    <div className={cn("relative w-full h-full", className)}>
      {imageUrl && (
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={recipe.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      )}
    </div>
  );
};
