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
          src={recipe.imageUrl || ""}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
          priority
          placeholder="blur"
          blurDataURL={recipe.blurDataURL}
        />
      </div>
    </div>
  );
};
