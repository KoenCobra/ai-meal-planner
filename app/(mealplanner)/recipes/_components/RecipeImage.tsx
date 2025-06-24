"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface RecipeImageProps {
  recipe: {
    title: string;
    imageId?: Id<"_storage">;
    blurDataURL?: string;
  };
  className?: string;
}

export const RecipeImage = ({ recipe, className }: RecipeImageProps) => {
  const { data: imageUrl } = useQuery({
    ...convexQuery(
      api.recipes.getRecipeImageUrl,
      recipe.imageId ? { imageId: recipe.imageId } : "skip",
    ),
  });

  return (
    <div className={cn("relative w-full h-full", className)}>
      {
        <div className="relative w-full h-full">
          <Image
            src={imageUrl || recipe.blurDataURL || ""}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-t-lg"
            priority
            placeholder={recipe.blurDataURL ? "blur" : "empty"}
            blurDataURL={recipe.blurDataURL}
          />
        </div>
      }
    </div>
  );
};
