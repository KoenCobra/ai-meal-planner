import { Id } from "@/convex/_generated/dataModel";
import { useBreakfastRecipes } from "../../_hooks/useBreakfastRecipes";
import { EmptyState } from "../EmptyState";
import { RecipeGrid } from "../RecipeGrid";

interface BreakfastTabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
}

const BreakfastTabContent = ({
  menuId,
  onDelete,
}: BreakfastTabContentProps) => {
  const { breakfastRecipes, isLoading, isError } = useBreakfastRecipes({
    menuId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading recipes</div>;
  }

  return (
    <div>
      {breakfastRecipes?.page.length === 0 ? (
        <EmptyState mealType="Breakfast" />
      ) : (
        <RecipeGrid
          recipes={breakfastRecipes?.page || []}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default BreakfastTabContent;
