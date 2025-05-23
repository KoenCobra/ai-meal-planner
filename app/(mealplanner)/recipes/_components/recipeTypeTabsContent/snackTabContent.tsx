import { Id } from "@/convex/_generated/dataModel";
import { InfiniteRecipeGrid } from "../InfiniteRecipeGrid";

interface SnackTabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
}

const SnackTabContent = ({ menuId, onDelete }: SnackTabContentProps) => {
  return (
    <InfiniteRecipeGrid
      mealType="snacks"
      menuId={menuId}
      onDelete={onDelete}
      itemsPerPage={5}
    />
  );
};

export default SnackTabContent;
