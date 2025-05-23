import { useBreakfastRecipes } from "../../_hooks/useBreakfastRecipes";
import { EmptyState } from "../EmptyState";
import { RecipeGrid } from "../RecipeGrid";

const BreakfastTabContent = () => {
  const { breakfastRecipes, isLoading, isError } = useBreakfastRecipes();

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
          onDelete={() => {}}
        />
      )}
    </div>
  );
};

export default BreakfastTabContent;
