"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Id } from "@/convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";
import DeleteRecipeDialog from "../../_components/DeleteRecipeDialog";
import { useRecipeDelete } from "../_hooks/useRecipeDelete";
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
    <div className="mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {menuId ? "Menu Recipes" : "My Recipes"}
      </h1>
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 dark:border dark:border-border/50">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
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
        mode={menuId ? "remove" : "delete"}
      />
    </div>
  );
};

export default RecipeDetails;
