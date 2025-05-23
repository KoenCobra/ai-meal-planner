import { useDinnerRecipes } from "../../_hooks/useDinnerRecipes";
import { EmptyState } from "../EmptyState";
import { RecipeGrid } from "../RecipeGrid";

const DinnerTabContent = () => {
  const { dinnerRecipes, isLoading, isError } = useDinnerRecipes();

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
        <RecipeGrid recipes={dinnerRecipes?.page || []} onDelete={() => {}} />
      )}
    </div>
  );
};

export default DinnerTabContent;
