"use client";

import { Id } from "@/convex/_generated/dataModel";
import DeleteRecipeDialog from "../../_components/DeleteRecipeDialog";
import { useRecipeDelete } from "../_hooks/useRecipeDelete";
import { useRecipes } from "../_hooks/useRecipes";
import { RecipeTabs } from "./RecipeTabs";

interface RecipeDetailsProps {
  menuId?: Id<"menus">;
}

const RecipeDetails = ({ menuId }: RecipeDetailsProps) => {
  const {
    recipeToDelete,
    setRecipeToDelete,
    handleDelete,
    handleConfirmDelete,
  } = useRecipeDelete({
    menuId,
  });

  const { recipesByType, loading } = useRecipes(menuId);

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

      <RecipeTabs recipesByType={recipesByType} onDelete={handleDelete} />

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
