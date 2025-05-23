import { useSnackRecipes } from "../../_hooks/useSnackRecipes";
import { EmptyState } from "../EmptyState";
import { RecipeGrid } from "../RecipeGrid";

const SnackTabContent = () => {
  const { snackRecipes, isLoading, isError } = useSnackRecipes();

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
        <RecipeGrid recipes={snackRecipes?.page || []} onDelete={() => {}} />
      )}
    </div>
  );
};

export default SnackTabContent;
