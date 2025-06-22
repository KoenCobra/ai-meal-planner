"use client";

import type { Id } from "@/convex/_generated/dataModel";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Array<{
    _id: Id<"recipes">;
    title: string;
    readyInMinutes: number;
    servings: number;
    imageUrl: string;
    categories: string[];
    dishType: string;
  }>;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
  menuId?: Id<"menus">;
}

export const RecipeGrid = ({ recipes, onDelete, menuId }: RecipeGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          onDelete={onDelete}
          menuId={menuId}
        />
      ))}
    </div>
  );
};
