import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UseMenuAssociationsProps {
  recipeId: Id<"recipes"> | null;
}

export const useMenuAssociations = ({ recipeId }: UseMenuAssociationsProps) => {
  const [selectedMenus, setSelectedMenus] = useState<Id<"menus">[]>([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: menus } = useQuery({
    ...convexQuery(api.menus.getMenus, {}),
  });

  const { data: menuRecipes } = useQuery({
    ...convexQuery(
      api.menus.getMenusContainingRecipe,
      recipeId ? { recipeId } : "skip",
    ),
  });

  const setMenuAssociations = useMutation(api.menus.setRecipeMenuAssociations);

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
    if (!recipeId) return false;

    setLoading(true);
    try {
      await setMenuAssociations({
        recipeId,
        menuIds: selectedMenus,
      });

      // Invalidate menu recipes cache for all affected menus
      selectedMenus.forEach((menuId: Id<"menus">) => {
        queryClient.invalidateQueries({
          queryKey: ["menu-recipes", menuId],
        });
      });

      // Also invalidate for menus that might have been removed
      if (menuRecipes) {
        menuRecipes.forEach((menu) => {
          queryClient.invalidateQueries({
            queryKey: ["menu-recipes", menu._id],
          });
        });
      }

      toast.success("Menu updated successfully");
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update menu";
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
    handleCheckboxChange,
    saveMenuAssociations,
  };
};
