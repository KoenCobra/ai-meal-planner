"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import Image from "next/image";

interface RecipeImageProps {
  recipe: {
    _id: Id<"recipes">;
    title: string;
    storageId?: Id<"_storage">;
    imageUrl?: string;
  };
  className?: string;
}

export const RecipeImage = ({ recipe, className }: RecipeImageProps) => {
  // const { data: imageUrl } = useQuery({
  //   ...convexQuery(
  //     api.recipes.images.getImageUrl,
  //     recipe.storageId ? { storageId: recipe.storageId } : "skip",
  //   ),
  // });

  return (
    <div className={cn("relative w-full h-full", className)}>
      {recipe.imageUrl && (
        <div className="relative w-full h-full">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-t-lg"
            priority
          />
        </div>
      )}
    </div>
  );
};
