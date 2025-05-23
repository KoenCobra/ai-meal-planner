import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { toast } from "sonner";

interface UseRecipeDeleteProps {
  menuId?: Id<"menus">;
}

export const useRecipeDelete = ({ menuId }: UseRecipeDeleteProps) => {
  const { user } = useUser();

  const userId = user?.id || "";

  const [recipeToDelete, setRecipeToDelete] = useState<{
    id: Id<"recipes">;
    title: string;
  } | null>(null);

  const deleteRecipe = useMutation(
    api.recipes.deleteRecipe,
  ).withOptimisticUpdate((localStore, args) => {
    const recipes = localStore.getQuery(api.recipes.getAllRecipes, {
      userId: args.userId,
    });
    if (recipes) {
      localStore.setQuery(
        api.recipes.getAllRecipes,
        { userId: args.userId },
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
      userId: args.userId,
      menuId: args.menuId,
    });
    if (recipes) {
      localStore.setQuery(
        api.menus.getMenuRecipes,
        { userId: args.userId, menuId: args.menuId },
        recipes.filter((recipe) => recipe._id !== args.recipeId),
      );
    }
  });

  const handleDelete = (recipeId: Id<"recipes">, title: string) => {
    setRecipeToDelete({ id: recipeId, title });
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      if (menuId) {
        // Remove from specific menu
        await removeFromMenu({
          userId,
          menuId,
          recipeId: recipeToDelete.id,
        });
        toast.success("Recipe removed from menu");
      } else {
        // Delete recipe completely
        await deleteRecipe({
          userId,
          id: recipeToDelete.id,
        });
        toast.success("Recipe deleted successfully");
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
