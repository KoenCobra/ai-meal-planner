import { useLunchRecipes } from "../../_hooks/useLunchRecipes";
import { EmptyState } from "../EmptyState";
import { RecipeGrid } from "../RecipeGrid";

const LunchTabContent = () => {
  const { lunchRecipes, isLoading, isError } = useLunchRecipes();

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
        <RecipeGrid recipes={lunchRecipes?.page || []} onDelete={() => {}} />
      )}
    </div>
  );
};

export default LunchTabContent;
