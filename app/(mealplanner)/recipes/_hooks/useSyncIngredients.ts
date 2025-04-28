import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

export const useSyncIngredients = (userId: string) => {
  const syncIngredientsToGroceryList = useMutation(
    api.recipes.syncIngredientsToGroceryList,
  );

  const handleSyncIngredients = async (recipeId: Id<"recipes">) => {
    try {
      await syncIngredientsToGroceryList({
        userId,
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
