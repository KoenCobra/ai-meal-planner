import { Id } from "@/convex/_generated/dataModel";
import { useLunchRecipes } from "../../_hooks/useLunchRecipes";
import { EmptyState } from "../EmptyState";
import { RecipeGrid } from "../RecipeGrid";

interface LunchTabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
}

const LunchTabContent = ({ menuId, onDelete }: LunchTabContentProps) => {
  const { lunchRecipes, isLoading, isError } = useLunchRecipes({ menuId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading recipes</div>;
  }

  return (
    <div>
      {lunchRecipes?.page.length === 0 ? (
        <EmptyState mealType="Lunch" />
      ) : (
        <RecipeGrid recipes={lunchRecipes?.page || []} onDelete={onDelete} />
      )}
    </div>
  );
};

export default LunchTabContent;
