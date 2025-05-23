import { TabsContent } from "@/components/ui/tabs";
import { Id } from "@/convex/_generated/dataModel";
import { Recipe } from "../_types/types";
import { EmptyState } from "./EmptyState";
import { RecipeGrid } from "./RecipeGrid";

interface RecipeTabContentProps {
  recipes: Recipe[];
  mealType: string;
  isLoading: boolean;
  isError: boolean;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
}

export const RecipeTabContent = ({
  recipes,
  mealType,
  isLoading,
  isError,
  onDelete,
}: RecipeTabContentProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading recipes</div>;
  }

  return (
    <TabsContent value={mealType.toLowerCase()} className="mt-6">
      {recipes.length === 0 ? (
        <EmptyState mealType={mealType} />
      ) : (
        <RecipeGrid recipes={recipes} onDelete={onDelete} />
      )}
    </TabsContent>
  );
};
