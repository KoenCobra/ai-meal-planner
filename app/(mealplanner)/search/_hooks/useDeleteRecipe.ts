import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useCallback } from "react";

export const useDeleteRecipe = () => {
  const { user } = useUser();
  const deleteRecipeMutation = useMutation(api.recipes.deleteRecipe);

  const deleteRecipe = useCallback(
    async (recipeId: Id<"recipes">, title: string, dishType: string) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      try {
        await deleteRecipeMutation({
          userId: user.id,
          id: recipeId,
          dishType,
        });

        // You could add a toast notification here
        console.log(`Recipe "${title}" deleted successfully`);
      } catch (error) {
        console.error("Failed to delete recipe:", error);
        // You could add error toast notification here
      }
    },
    [user?.id, deleteRecipeMutation],
  );

  return { deleteRecipe };
};
