"use client";

import React from "react";
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
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <RecipeImage recipe={recipe} />
    </div>
  );
};

export default RecipeDetailHeader;
