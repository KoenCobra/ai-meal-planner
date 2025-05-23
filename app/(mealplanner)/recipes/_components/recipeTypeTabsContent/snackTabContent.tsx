import { Id } from "@/convex/_generated/dataModel";
import { useSnackRecipes } from "../../_hooks/useSnackRecipes";
import { EmptyState } from "../EmptyState";
import { RecipeGrid } from "../RecipeGrid";

interface SnackTabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
}

const SnackTabContent = ({ menuId, onDelete }: SnackTabContentProps) => {
  const { snackRecipes, isLoading, isError } = useSnackRecipes({ menuId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading recipes</div>;
  }

  return (
    <div>
      {snackRecipes?.page.length === 0 ? (
        <EmptyState mealType="Snack" />
      ) : (
        <RecipeGrid recipes={snackRecipes?.page || []} onDelete={onDelete} />
      )}
    </div>
  );
};

export default SnackTabContent;
