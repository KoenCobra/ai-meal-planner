import { Id } from "@/convex/_generated/dataModel";
import { InfiniteRecipeGrid } from "../InfiniteRecipeGrid";

interface DinnerTabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

const DinnerTabContent = ({ menuId, onDelete }: DinnerTabContentProps) => {
  return (
    <InfiniteRecipeGrid
      mealType="dinner"
      menuId={menuId}
      onDelete={onDelete}
      itemsPerPage={5}
    />
  );
};

export default DinnerTabContent;
