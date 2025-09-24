import { Id } from "@/convex/_generated/dataModel";
import { MealType } from "../tabs";
import { InfiniteRecipeGrid } from "./InfiniteRecipeGrid";

interface RecipeTabContentProps {
  mealType: MealType;
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

export const RecipeTabContent = ({
  mealType,
  menuId,
  onDelete,
}: RecipeTabContentProps) => {
  return (
    <InfiniteRecipeGrid
      mealType={mealType}
      menuId={menuId}
      onDelete={onDelete}
    />
  );
};
