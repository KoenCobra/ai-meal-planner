"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import DeleteRecipeDialog from "../../_components/DeleteRecipeDialog";
import { useRecipeDelete } from "../_hooks/useRecipeDelete";
import { useRecipes } from "../_hooks/useRecipes";
import { useSyncIngredients } from "../_hooks/useSyncIngredients";
import { RecipeTabs } from "./RecipeTabs";

interface RecipeDetailsProps {
  menuId?: Id<"menus">;
}

const RecipeDetails = ({ menuId }: RecipeDetailsProps) => {
  const { user } = useUser();
  const userId = user?.id || "";

  const {
    recipeToDelete,
    setRecipeToDelete,
    handleDelete,
    handleConfirmDelete,
  } = useRecipeDelete({
    userId,
    menuId,
  });

  const { handleSyncIngredients } = useSyncIngredients(userId);
  const { recipesByType, loading } = useRecipes(userId, menuId);

  if (!user) return null;

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
        onSyncIngredients={handleSyncIngredients}
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
