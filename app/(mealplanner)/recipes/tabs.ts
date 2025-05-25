import { Id } from "@/convex/_generated/dataModel";
import BreakfastTabContent from "./_components/recipeTypeTabsContent/breakfastTabContent";
import DinnerTabContent from "./_components/recipeTypeTabsContent/dinnerTabContent";
import LunchTabContent from "./_components/recipeTypeTabsContent/lunchTabContent";
import SnackTabContent from "./_components/recipeTypeTabsContent/snackTabContent";

interface TabContentProps {
  menuId?: Id<"menus">;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

export const tabs: {
  title: string;
  component: React.ComponentType<TabContentProps>;
  key: string;
}[] = [
  {
    title: "Breakfast",
    component: BreakfastTabContent,
    key: "breakfast",
  },
  {
    title: "Lunch",
    component: LunchTabContent,
    key: "lunch",
  },
  {
    title: "Dinner",
    component: DinnerTabContent,
    key: "dinner",
  },
  {
    title: "Snacks",
    component: SnackTabContent,
    key: "snacks",
  },
];
