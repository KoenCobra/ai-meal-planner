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

  // Mutation
  const setMenuAssociations = useMutation(api.menus.setRecipeMenuAssociations);

  // Initialize selected menus when data is loaded
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
        userId,
        recipeId,
        menuIds: selectedMenus,
      });
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
