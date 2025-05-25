import { Id } from "@/convex/_generated/dataModel";
import { InfiniteRecipeGrid } from "../InfiniteRecipeGrid";

interface BreakfastTabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

const BreakfastTabContent = ({
  menuId,
  onDelete,
}: BreakfastTabContentProps) => {
  return (
    <InfiniteRecipeGrid
      mealType="breakfast"
      menuId={menuId}
      onDelete={onDelete}
      itemsPerPage={5}
    />
  );
};

export default BreakfastTabContent;
