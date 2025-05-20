"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import DeleteRecipeDialog from "../../_components/DeleteRecipeDialog";
import { useRecipeDelete } from "../_hooks/useRecipeDelete";
import { useRecipes } from "../_hooks/useRecipes";
import { RecipeTabs } from "./RecipeTabs";

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

  const { recipesByType, loading } = useRecipes(menuId);

  // Get the current tab from search params or default to "breakfast"
  const currentTab = searchParams.get("type") || "breakfast";

  // Function to set the current tab via URL query parameter
  const setCurrentTab = (tab: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("type", tab);
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  };

  // Update URL on initial load if no type parameter exists
  useEffect(() => {
    if (!searchParams.has("type")) {
      setCurrentTab("breakfast");
    }
  }, [searchParams]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!recipesByType) {
    return <div className="text-center mt-8">Error loading recipes</div>;
  }

  return (
    <div className="mx-auto py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">
        {menuId ? "Menu Recipes" : "My Recipes"}
      </h1>

      <RecipeTabs
        recipesByType={recipesByType}
        onDelete={handleDelete}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

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
