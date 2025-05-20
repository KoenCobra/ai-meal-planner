import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Id } from "@/convex/_generated/dataModel";
import { Recipe } from "../_types/types";
import { RecipeTabContent } from "./RecipeTabContent";

interface RecipeTabsProps {
  recipesByType: Record<string, Recipe[]>;
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const RecipeTabs = ({
  recipesByType,
  onDelete,
  currentTab,
  setCurrentTab,
}: RecipeTabsProps) => (
  <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
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
    />
    <RecipeTabContent
      recipes={recipesByType.lunch}
      mealType="lunch"
      onDelete={onDelete}
    />
    <RecipeTabContent
      recipes={recipesByType.dinner}
      mealType="dinner"
      onDelete={onDelete}
    />
    <RecipeTabContent
      recipes={recipesByType.snacks}
      mealType="snacks"
      onDelete={onDelete}
    />
  </Tabs>
);
