import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { RecipeInput } from "@/lib/validation";
import { useUser } from "@clerk/clerk-react";
import { useAction, useMutation, useQuery } from "convex/react";
import { Image, Save } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

interface BubuAiResponseProps {
  recipe: RecipeInput;
}

const AiResponse = ({ recipe }: BubuAiResponseProps) => {
  const { user } = useUser();
  const [savedRecipeId, setSavedRecipeId] =
    React.useState<Id<"recipes"> | null>(null);
  const [recipeImageId, setRecipeImageId] =
    React.useState<Id<"_storage"> | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = React.useState(false);

  const createRecipe = useMutation(api.recipes.createRecipe);
  const generateImage = useAction(api.recipes.images.generateRecipeImage);
  const getImageUrl = useQuery(
    api.recipes.images.getImageUrl,
    savedRecipeId && recipeImageId ? { storageId: recipeImageId } : "skip",
  );

  useEffect(() => {
    // Reset states when a new recipe is received
    setSavedRecipeId(null);
    setRecipeImageId(null);
  }, [recipe]);

  if (recipe?.error) {
    toast.error(recipe.error);
  }

  const handleSave = async () => {
    if (!user) return;

    try {
      // Create the recipe in the database
      const newRecipeId = await createRecipe({
        userId: user.id,
        title: recipe.title,
        summary: recipe.summary,
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        diets: recipe.diets,
        instructions: {
          name: recipe.title,
          steps: recipe.instructions.steps,
        },
        ingredients: recipe.ingredients,
        dishTypes: recipe.dishTypes || [],
      });

      setSavedRecipeId(newRecipeId);
      toast.success("Recipe saved successfully!");
    } catch (error) {
      toast.error("Failed to save recipe");
      console.error(error);
    }
  };

  const handleGenerateImage = async () => {
    if (!user || !savedRecipeId) {
      toast.error("Please save the recipe first");
      return;
    }

    try {
      setIsGeneratingImage(true);
      const storageId = await generateImage({
        userId: user.id,
        recipeId: savedRecipeId,
        recipeTitle: recipe.title,
        recipeDescription: recipe.summary,
      });

      setRecipeImageId(storageId);
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate image");
      console.error(error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <>
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold">{recipe?.title?.toUpperCase()}</h1>
        <p className="text-muted-foreground mb-2 text-sm">
          ({recipe?.diets?.join(" • ")})
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            className="mt-4 text-xl p-7"
            onClick={handleSave}
            disabled={!!savedRecipeId}
          >
            {savedRecipeId ? "Recipe Saved" : "Save Recipe"}
            <Save className="ml-2" size={14} />
          </Button>
          <Button
            variant="outline"
            className="mt-4 text-xl p-7"
            onClick={handleGenerateImage}
            disabled={!savedRecipeId || isGeneratingImage}
          >
            {isGeneratingImage ? "Generating..." : "Generate Image"}
            <Image className="ml-2" size={14} />
          </Button>
        </div>
        {getImageUrl && (
          <div className="mt-6">
            <img
              src={getImageUrl}
              alt={recipe.title}
              className="mx-auto rounded-lg shadow-lg max-w-2xl"
            />
          </div>
        )}
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
                {ingredient.name?.charAt(0).toUpperCase() +
                  ingredient.name?.slice(1)}
              </p>
              <p className="text-muted-foreground">
                {ingredient.measures?.amount} {ingredient.measures?.unit}
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
    </>
  );
};

export default AiResponse;
