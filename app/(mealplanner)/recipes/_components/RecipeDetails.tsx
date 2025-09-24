"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Id } from "@/convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";
import DeleteRecipeDialog from "../../_components/DeleteRecipeDialog";
import { useRecipeDelete } from "../_hooks/useRecipeDelete";
import { MealType, tabs } from "../tabs";
import { RecipeTabContent } from "./RecipeTabContent";

interface RecipeDetailsProps {
  menuId?: Id<"menus">;
}

const RecipeDetails = ({ menuId }: RecipeDetailsProps) => {
  const searchParams = useSearchParams();

  const {
    recipeToDelete,
    setRecipeToDelete,
    handleDelete,
    handleConfirmDelete,
  } = useRecipeDelete({
    menuId,
  });

  const currentTab = searchParams.get("type") || "breakfast";

  const setCurrentTab = (tab: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("type", tab);
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  };

  // Type guard to ensure currentTab is a valid meal type
  const isValidMealType = (tab: string): tab is MealType => {
    return tabs.some((t) => t.key === tab);
  };

  const validCurrentTab = isValidMealType(currentTab)
    ? currentTab
    : "breakfast";

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {menuId ? "Menu Recipes" : "My Recipes"}
      </h1>
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 dark:border dark:border-border/50">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-6">
        <RecipeTabContent
          mealType={validCurrentTab}
          menuId={menuId}
          onDelete={handleDelete}
        />
      </div>

      <DeleteRecipeDialog
        open={!!recipeToDelete}
        onOpenChange={(open) => !open && setRecipeToDelete(null)}
        onConfirm={handleConfirmDelete}
        recipeName={recipeToDelete?.title || ""}
        mode={menuId ? "remove" : "delete"}
      />
    </div>
  );
};

export default RecipeDetails;
