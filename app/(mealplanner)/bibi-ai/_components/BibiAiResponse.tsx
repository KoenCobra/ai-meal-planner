import React from "react";
import { RecipeInput } from "@/lib/validation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddToMenuDialog from "../../_components/AddToMenuDialog";
import { Id } from "@/convex/_generated/dataModel";
import { useAddToMenuDialogStore } from "../../_stores/useAddToMenuDialogStore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

interface BubuAiResponseProps {
  recipe: RecipeInput;
}

const AiResponse = ({ recipe }: BubuAiResponseProps) => {
  const { user } = useUser();
  const { open, recipeId, openDialog, closeDialog } = useAddToMenuDialogStore();
  const createRecipe = useMutation(api.recipes.createRecipe);

  if (recipe?.error) {
    toast.error(recipe.error);
  }

  const handleAddToMenu = async () => {
    if (!user) {
      toast.error("You must be logged in to add recipes to menus");
      return;
    }

    try {
      // Transform ingredients to string array
      const ingredients = recipe.ingredients.map(
        (ing) => `${ing.name} - ${ing.measures.amount} ${ing.measures.unit}`,
      );

      // Transform instructions to a single string
      const instructions = recipe.instructions.steps
        .map((step, index) => `${index + 1}. ${step.step}`)
        .join("\n");

      // Create the recipe in the database
      const newRecipeId = await createRecipe({
        userId: user.id,
        title: recipe.title,
        summary: recipe.summary,
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        diets: recipe.diets,
        instructions,
        ingredients,
        dishTypes: recipe.dishTypes || [],
      });

      // Open the menu dialog with the new recipe ID
      openDialog(newRecipeId);
    } catch (error) {
      toast.error("Failed to create recipe");
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold">{recipe?.title.toUpperCase()}</h1>
        <p className="text-muted-foreground mb-2 text-sm">
          ({recipe?.diets?.join(" • ")})
        </p>
        <Button
          variant="secondary"
          className="mt-4 text-xl p-7"
          onClick={handleAddToMenu}
        >
          Add to a menu
          <Plus size={14} />
        </Button>
        <div className="border-b border-t border-border mt-6 py-3">
          <p className="text-muted-foreground max-w-xl mx-auto">
            {recipe?.summary}
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-6 mt-10 gap-8 lg:gap-16">
        <div className="lg:col-span-2">
          <p className="font-bold text-xl">Ingredients</p>
          <p className="text-muted-foreground mb-6">
            {recipe?.servings} servings | {recipe?.readyInMinutes} minutes
          </p>
          {recipe?.ingredients?.map((ingredient) => (
            <div key={ingredient.name} className="gap-5 mb-6">
              <p>
                {ingredient.name.charAt(0).toUpperCase() +
                  ingredient.name.slice(1)}
              </p>
              <p className="text-muted-foreground">
                {ingredient.measures.amount} {ingredient.measures.unit}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <p className="font-bold text-xl mb-6">Instructions</p>
          {recipe?.instructions?.steps?.map((step, index) => (
            <div key={step.number} className="mb-2 flex gap-2">
              <span className="text-right">{index + 1}.</span>
              <p className="mb-4">{step.step}</p>
            </div>
          ))}
        </div>
      </div>

      <AddToMenuDialog
        open={open}
        onOpenChange={closeDialog}
        recipeId={recipeId as Id<"recipes">}
      />
    </>
  );
};

export default AiResponse;
