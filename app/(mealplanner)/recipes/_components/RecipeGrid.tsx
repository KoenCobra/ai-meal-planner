import { Id } from "@/convex/_generated/dataModel";
import { Recipe } from "../_types/types";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
}

export const RecipeGrid = ({ recipes, onDelete }: RecipeGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} onDelete={onDelete} />
      ))}
    </div>
  );
};
