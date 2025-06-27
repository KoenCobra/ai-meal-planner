import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConvex } from "convex/react";
import { ConvexError } from "convex/values";
import { useState } from "react";
import { toast } from "sonner";

interface UseRecipeDeleteProps {
  menuId?: Id<"menus">;
}

interface Recipe {
  _id: Id<"recipes">;
  title: string;
  dishType: string;
  [key: string]: unknown;
}

interface PaginatedRecipes {
  pages: Array<{
    page: Recipe[];
    isDone: boolean;
    continueCursor: string | null;
  }>;
  pageParams: unknown[];
}

export const useRecipeDelete = ({ menuId }: UseRecipeDeleteProps) => {
  const queryClient = useQueryClient();
  const convex = useConvex();
  const [recipeToDelete, setRecipeToDelete] = useState<{
    id: Id<"recipes">;
    title: string;
    dishType: string;
  } | null>(null);

  const deleteRecipe = useMutation({
    mutationFn: async (variables: { id: Id<"recipes">; dishType: string }) => {
      return await convex.mutation(api.recipes.deleteRecipe, variables);
    },
    onMutate: async (variables) => {
      // Cancel any outgoing refetches for this dish type
      await queryClient.cancelQueries({
        queryKey: ["recipes", variables.dishType],
      });

      // Snapshot the previous value
      const previousRecipes = queryClient.getQueryData<PaginatedRecipes>([
        "recipes",
        variables.dishType,
      ]);

      // Optimistically update by removing the recipe
      queryClient.setQueryData<PaginatedRecipes>(
        ["recipes", variables.dishType],
        (old) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              page: page.page.filter((recipe) => recipe._id !== variables.id),
            })),
          };
        },
      );

      // Return context for potential rollback
      return { previousRecipes };
    },
    onError: (err, variables, context) => {
      // Roll back the optimistic update on error
      if (context?.previousRecipes) {
        queryClient.setQueryData(
          ["recipes", variables.dishType],
          context.previousRecipes,
        );
      }
    },
    onSettled: () => {
      // Invalidate and refetch all recipe caches
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["search-recipes"],
      });
      // Invalidate menu-related queries so deleted recipes are removed from menus
      queryClient.invalidateQueries({
        queryKey: ["menu-recipes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["menus"],
      });
    },
  });

  const removeFromMenu = useMutation({
    mutationFn: async (variables: {
      menuId: Id<"menus">;
      recipeId: Id<"recipes">;
    }) => {
      return await convex.mutation(api.menus.removeRecipeFromMenu, variables);
    },
    onMutate: async (variables) => {
      if (!recipeToDelete) return;

      // Cancel any outgoing refetches for menu recipes
      await queryClient.cancelQueries({
        queryKey: ["menu-recipes", variables.menuId, recipeToDelete.dishType],
      });

      // Snapshot the previous value
      const previousMenuRecipes = queryClient.getQueryData<PaginatedRecipes>([
        "menu-recipes",
        variables.menuId,
        recipeToDelete.dishType,
      ]);

      // Optimistically update by removing the recipe
      queryClient.setQueryData<PaginatedRecipes>(
        ["menu-recipes", variables.menuId, recipeToDelete.dishType],
        (old) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              page: page.page.filter(
                (recipe) => recipe._id !== variables.recipeId,
              ),
            })),
          };
        },
      );

      // Return context for potential rollback
      return { previousMenuRecipes };
    },
    onError: (err, variables, context) => {
      if (!recipeToDelete) return;

      // Roll back the optimistic update on error
      if (context?.previousMenuRecipes) {
        queryClient.setQueryData(
          ["menu-recipes", variables.menuId, recipeToDelete.dishType],
          context.previousMenuRecipes,
        );
      }
    },
    onSettled: (data, error, variables) => {
      // Invalidate and refetch menu recipes
      queryClient.invalidateQueries({
        queryKey: ["menu-recipes", variables.menuId],
      });
    },
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
        // Remove from specific menu with optimistic update
        await removeFromMenu.mutateAsync({
          menuId,
          recipeId: recipeToDelete.id,
        });
      } else {
        // Delete recipe completely with optimistic update
        await deleteRecipe.mutateAsync({
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
