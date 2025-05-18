import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Id } from "@/convex/_generated/dataModel";
import { Recipe } from "../_types/types";
import { RecipeTabContent } from "./RecipeTabContent";

interface RecipeTabsProps {
  recipesByType: Record<string, Recipe[]>;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
  onSyncIngredients: (recipeId: Id<"recipes">) => void;
}

export const RecipeTabs = ({
  recipesByType,
  onDelete,
  onSyncIngredients,
}: RecipeTabsProps) => (
  <Tabs defaultValue="breakfast" className="w-full">
    <TabsList className="grid w-full grid-cols-4">
      <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
      <TabsTrigger value="lunch">Lunch</TabsTrigger>
      <TabsTrigger value="dinner">Dinner</TabsTrigger>
      <TabsTrigger value="snacks">Snacks</TabsTrigger>
    </TabsList>

    <RecipeTabContent
      recipes={recipesByType.breakfast}
      mealType="breakfast"
      onDelete={onDelete}
      onSyncIngredients={onSyncIngredients}
    />
    <RecipeTabContent
      recipes={recipesByType.lunch}
      mealType="lunch"
      onDelete={onDelete}
      onSyncIngredients={onSyncIngredients}
    />
    <RecipeTabContent
      recipes={recipesByType.dinner}
      mealType="dinner"
      onDelete={onDelete}
      onSyncIngredients={onSyncIngredients}
    />
    <RecipeTabContent
      recipes={recipesByType.snacks}
      mealType="snacks"
      onDelete={onDelete}
      onSyncIngredients={onSyncIngredients}
    />
  </Tabs>
);
