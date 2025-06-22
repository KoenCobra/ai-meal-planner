import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { toast } from "sonner";

interface UseRecipeDeleteProps {
  menuId?: Id<"menus">;
}

export const useRecipeDelete = ({ menuId }: UseRecipeDeleteProps) => {
  const [recipeToDelete, setRecipeToDelete] = useState<{
    id: Id<"recipes">;
    title: string;
    dishType: string;
  } | null>(null);

  const deleteRecipe = useMutation(
    api.recipes.deleteRecipe,
  ).withOptimisticUpdate((localStore, args) => {
    const recipes = localStore.getQuery(api.recipes.getRecipesByDishType, {
      dishType: args.dishType,
      paginationOpts: {
        numItems: 100,
        cursor: null,
      },
    });
    if (recipes) {
      localStore.setQuery(
        api.recipes.getRecipesByDishType,
        {
          dishType: args.dishType,
          paginationOpts: {
            numItems: 100,
            cursor: null,
          },
        },

        {
          ...recipes,
          page: recipes.page.filter((recipe) => recipe._id !== args.id),
        },
      );
    }
  });

  const removeFromMenu = useMutation(
    api.menus.removeRecipeFromMenu,
  ).withOptimisticUpdate((localStore, args) => {
    const recipes = localStore.getQuery(api.menus.getMenuRecipes, {
      menuId: args.menuId,
    });
    if (recipes) {
      localStore.setQuery(
        api.menus.getMenuRecipes,
        { menuId: args.menuId },
        recipes.filter((recipe) => recipe._id !== args.recipeId),
      );
    }
  });

  const handleDelete = (
    recipeId: Id<"recipes">,
    title: string,
    dishType: string,
  ) => {
    setRecipeToDelete({ id: recipeId, title, dishType });
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      if (menuId) {
        // Remove from specific menu
        await removeFromMenu({
          menuId,
          recipeId: recipeToDelete.id,
        });
      } else {
        // Delete recipe completely
        await deleteRecipe({
          id: recipeToDelete.id,
          dishType: recipeToDelete.dishType,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError ? error.data : "Error deleting recipe";
      toast.error(errorMessage);
    }

    setRecipeToDelete(null);
  };

  return {
    recipeToDelete,
    setRecipeToDelete,
    handleDelete,
    handleConfirmDelete,
  };
};
