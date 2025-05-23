import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UseMenuAssociationsProps {
  userId: string;
  recipeId: Id<"recipes"> | null;
}

export const useMenuAssociations = ({
  userId,
  recipeId,
}: UseMenuAssociationsProps) => {
  const [selectedMenus, setSelectedMenus] = useState<Id<"menus">[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all available menus
  const { data: menus } = useQuery({
    ...convexQuery(api.menus.getMenus, { userId }),
  });

  // Get menus that contain this recipe
  const { data: menuRecipes } = useQuery({
    ...convexQuery(
      api.menus.getMenusContainingRecipe,
      userId && recipeId ? { userId, recipeId } : "skip",
    ),
  });

  // Mutations
  const addRecipeToMenu = useMutation(
    api.menus.addRecipeToMenu,
  ).withOptimisticUpdate((localStore, args) => {
    const existingMenus = localStore.getQuery(
      api.menus.getMenusContainingRecipe,
      {
        userId: args.userId,
        recipeId: args.recipeId,
      },
    );
    if (existingMenus) {
      const menuToAdd = localStore.getQuery(api.menus.getMenu, {
        userId: args.userId,
        id: args.menuId,
      });
      if (menuToAdd) {
        localStore.setQuery(
          api.menus.getMenusContainingRecipe,
          { userId: args.userId, recipeId: args.recipeId },
          [...existingMenus, menuToAdd],
        );
      }
    }
  });

  const removeRecipeFromMenu = useMutation(
    api.menus.removeRecipeFromMenu,
  ).withOptimisticUpdate((localStore, args) => {
    const existingMenus = localStore.getQuery(
      api.menus.getMenusContainingRecipe,
      {
        userId: args.userId,
        recipeId: args.recipeId,
      },
    );
    if (existingMenus) {
      localStore.setQuery(
        api.menus.getMenusContainingRecipe,
        { userId: args.userId, recipeId: args.recipeId },
        existingMenus.filter((menu) => menu._id !== args.menuId),
      );
    }
  });

  // Initialize selected menus when data is loaded or dialog opens
  useEffect(() => {
    if (menuRecipes) {
      setSelectedMenus(menuRecipes.map((menu) => menu._id));
    }
  }, [menuRecipes]);

  const handleCheckboxChange = (menuId: Id<"menus">) => {
    setSelectedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId],
    );
  };

  const saveMenuAssociations = async () => {
    if (!recipeId || !menuRecipes) return false;
    setLoading(true);
    setError(null);

    try {
      const initialMenuIds = new Set(menuRecipes.map((menu) => menu._id));

      // Add recipe to newly selected menus
      const addPromises = selectedMenus
        .filter((menuId) => !initialMenuIds.has(menuId))
        .map((menuId) =>
          addRecipeToMenu({
            userId,
            menuId,
            recipeId,
          }),
        );

      // Remove recipe from unselected menus
      const removePromises = menuRecipes
        .filter((menu) => !selectedMenus.includes(menu._id))
        .map((menu) =>
          removeRecipeFromMenu({
            userId,
            menuId: menu._id,
            recipeId,
          }),
        );

      await Promise.all([...addPromises, ...removePromises]);
      toast.success("Menu associations updated successfully");
      return true;
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Failed to update menu associations";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    menus,
    selectedMenus,
    loading,
    error,
    handleCheckboxChange,
    saveMenuAssociations,
  };
};
