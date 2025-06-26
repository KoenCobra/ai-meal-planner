"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface RecipeImageProps {
  recipe: {
    title: string;
    imageId?: string;
    imageUrl?: string;
    blurDataURL?: string;
  };
  className?: string;
}

export const RecipeImage = ({ recipe, className }: RecipeImageProps) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className="relative w-full h-full">
        <Image
          src={recipe.imageUrl || recipe.blurDataURL || ""}
          alt={recipe.title}
          fill
          className="object-cover rounded-t-lg"
          priority
          placeholder={recipe.blurDataURL ? "blur" : "empty"}
          blurDataURL={recipe.blurDataURL}
        />
      </div>
    </div>
  );
};
