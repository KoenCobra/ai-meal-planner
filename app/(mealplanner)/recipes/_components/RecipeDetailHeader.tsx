"use client";

import { Id } from "@/convex/_generated/dataModel";
import { RecipeImage } from "./RecipeImage";

interface RecipeDetailHeaderProps {
  recipe: {
    _id: Id<"recipes">;
    title: string;
    storageId?: Id<"_storage">;
  };
}

const RecipeDetailHeader = ({ recipe }: RecipeDetailHeaderProps) => {
  return (
    <div className="w-full aspect-square rounded-lg overflow-hidden shadow-lg">
      <RecipeImage recipe={recipe} />
    </div>
  );
};

export default RecipeDetailHeader;
