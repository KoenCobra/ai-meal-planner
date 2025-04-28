import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

export const useSyncMenuIngredients = (userId: string) => {
  const syncMenuIngredientsToGroceryList = useMutation(
    api.menus.syncMenuIngredientsToGroceryList,
  );

  const handleSyncMenuIngredients = async (menuId: Id<"menus">) => {
    try {
      await syncMenuIngredientsToGroceryList({
        userId,
        menuId,
      });
      toast.success("Menu ingredients added to grocery list");
    } catch (error: unknown) {
      console.error("Failed to sync menu ingredients:", error);
      toast.error("Failed to add menu ingredients to grocery list");
    }
  };

  return { handleSyncMenuIngredients };
};
