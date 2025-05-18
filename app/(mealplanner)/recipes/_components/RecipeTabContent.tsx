import { TabsContent } from "@/components/ui/tabs";
import { Id } from "@/convex/_generated/dataModel";
import { Recipe } from "../_types/types";
import { EmptyState } from "./EmptyState";
import { RecipeGrid } from "./RecipeGrid";

interface RecipeTabContentProps {
  recipes: Recipe[];
  mealType: string;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
  onSyncIngredients: (recipeId: Id<"recipes">) => void;
}

export const RecipeTabContent = ({
  recipes,
  mealType,
  onDelete,
  onSyncIngredients,
}: RecipeTabContentProps) => (
  <TabsContent value={mealType.toLowerCase()} className="mt-6">
    {recipes.length === 0 ? (
      <EmptyState mealType={mealType} />
    ) : (
      <RecipeGrid
        recipes={recipes}
        onDelete={onDelete}
        onSyncIngredients={onSyncIngredients}
      />
    )}
  </TabsContent>
);
