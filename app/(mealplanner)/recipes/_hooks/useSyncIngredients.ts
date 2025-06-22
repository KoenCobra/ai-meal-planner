import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";

export const useSyncIngredients = () => {
  const syncIngredientsToGroceryList = useMutation(
    api.recipes.syncIngredientsToGroceryList,
  );

  const handleSyncIngredients = async (recipeId: Id<"recipes">) => {
    try {
      await syncIngredientsToGroceryList({
        recipeId,
      });
      toast.success("Ingredients added to grocery list");
    } catch (error: unknown) {
      console.error("Failed to sync ingredients:", error);
      toast.error("Failed to add ingredients to grocery list");
    }
  };

  return { handleSyncIngredients };
};
