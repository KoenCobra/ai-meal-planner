import { Id } from "@/convex/_generated/dataModel";
import { InfiniteRecipeGrid } from "../InfiniteRecipeGrid";

interface OtherTabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

const OtherTabContent = ({ menuId, onDelete }: OtherTabContentProps) => {
  return (
    <InfiniteRecipeGrid mealType="other" menuId={menuId} onDelete={onDelete} />
  );
};

export default OtherTabContent;
