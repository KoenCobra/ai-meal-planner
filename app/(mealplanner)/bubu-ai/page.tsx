"use client";

import { RecipeInput } from "@/lib/validation";
import BubuAiForm from "./_components/BubuAiForm";
import BubuAiResponse from "./_components/BubuAiResponse";
import { useBubuAi } from "./BubuAiContext";

const BibiAi = () => {
  const {
    recipeData,
    recipeImage,
    setRecipeData,
    setRecipeImage,
    clearRecipe,
  } = useBubuAi();

  const handleRecipeGenerated = (recipe: RecipeInput, image?: string) => {
    setRecipeData(recipe);
    if (image) {
      setRecipeImage(image);
    }
  };

  const handleGenerationStart = () => {
    // Clear previous recipe and image when generation starts
    clearRecipe();
  };

  const handleImageGenerationAborted = () => {
    // Clear the recipe when image generation is aborted
    clearRecipe();
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">Ask Bubu</h1>
        <p className="text-muted-foreground mb-2">
          Generate recipes with Bubu AI.
        </p>
      </div>
      <BubuAiForm
        onRecipeGenerated={handleRecipeGenerated}
        onGenerationStart={handleGenerationStart}
        onImageGenerationAborted={handleImageGenerationAborted}
      />

      {recipeData && (
        <BubuAiResponse
          recipe={recipeData}
          image={recipeImage}
          onClear={clearRecipe}
        />
      )}
    </>
  );
};

export default BibiAi;
