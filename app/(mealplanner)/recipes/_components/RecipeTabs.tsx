import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Id } from "@/convex/_generated/dataModel";
import { useLunchRecipes } from "../_hooks/useLunchRecipes";
import { RecipeTabContent } from "./RecipeTabContent";
interface RecipeTabsProps {
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const RecipeTabs = ({
  onDelete,
  currentTab,
  setCurrentTab,
}: RecipeTabsProps) => {
  // const { breakfastRecipes, isLoading, isError } = useBreakfastRecipes();
  const {
    lunchRecipes,
    isLoading: lunchLoading,
    isError: lunchError,
  } = useLunchRecipes();

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
        <TabsTrigger value="lunch">Lunch</TabsTrigger>
        <TabsTrigger value="dinner">Dinner</TabsTrigger>
        <TabsTrigger value="snacks">Snacks</TabsTrigger>
      </TabsList>
      {/* 
      <RecipeTabContent
        recipes={breakfastRecipes?.page || []}
        mealType="breakfast"
        onDelete={onDelete}
        isLoading={isLoading}
        isError={isError}
      /> */}
      <RecipeTabContent
        recipes={lunchRecipes?.page || []}
        mealType="lunch"
        onDelete={onDelete}
        isLoading={lunchLoading}
        isError={lunchError}
      />
      {/* <RecipeTabContent
      // recipes={recipesByType.dinner}
      mealType="dinner"
      onDelete={onDelete}
    />
    <RecipeTabContent
      // recipes={recipesByType.snacks}
      mealType="snacks"
      onDelete={onDelete}
    /> */}
    </Tabs>
  );
};
