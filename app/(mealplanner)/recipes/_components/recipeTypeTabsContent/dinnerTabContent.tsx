import { Id } from "@/convex/_generated/dataModel";
import { useDinnerRecipes } from "../../_hooks/useDinnerRecipes";
import { EmptyState } from "../EmptyState";
import { RecipeGrid } from "../RecipeGrid";

interface DinnerTabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
}

const DinnerTabContent = ({ menuId, onDelete }: DinnerTabContentProps) => {
  const { dinnerRecipes, isLoading, isError } = useDinnerRecipes({ menuId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading recipes</div>;
  }

  return (
    <div>
      {dinnerRecipes?.page.length === 0 ? (
        <EmptyState mealType="Dinner" />
      ) : (
        <RecipeGrid recipes={dinnerRecipes?.page || []} onDelete={onDelete} />
      )}
    </div>
  );
};

export default DinnerTabContent;
