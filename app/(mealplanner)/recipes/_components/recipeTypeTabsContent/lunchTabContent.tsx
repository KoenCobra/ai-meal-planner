import { Id } from "@/convex/_generated/dataModel";
import { InfiniteRecipeGrid } from "../InfiniteRecipeGrid";

interface LunchTabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

const LunchTabContent = ({ menuId, onDelete }: LunchTabContentProps) => {
  return (
    <InfiniteRecipeGrid
      mealType="lunch"
      menuId={menuId}
      onDelete={onDelete}
      itemsPerPage={5}
    />
  );
};

export default LunchTabContent;
