"use client";

import { RecipeImage } from "./RecipeImage";

interface RecipeDetailHeaderProps {
  recipe: {
    title: string;
    imageUrl: string;
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
