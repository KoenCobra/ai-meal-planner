"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";
import DeleteRecipeDialog from "../../_components/DeleteRecipeDialog";
import { useRecipeDelete } from "../_hooks/useRecipeDelete";
// import { useRecipes } from "../_hooks/useRecipes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabs } from "../tabs";

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

  const RecipeTabContent = tabs.find(
    (tab) => tab.key === currentTab,
  )?.component;

  return (
    <div className="mx-auto py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">
        {menuId ? "Menu Recipes" : "My Recipes"}
      </h1>
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
        </TabsList>
      </Tabs>
      {RecipeTabContent && (
        <RecipeTabContent menuId={menuId} onDelete={handleDelete} />
      )}

      <DeleteRecipeDialog
        open={!!recipeToDelete}
        onOpenChange={(open) => !open && setRecipeToDelete(null)}
        onConfirm={handleConfirmDelete}
        recipeName={recipeToDelete?.title || ""}
      />
    </div>
  );
};

export default RecipeDetails;
