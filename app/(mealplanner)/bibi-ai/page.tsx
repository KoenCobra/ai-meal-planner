"use client";

import { RecipeInput } from "@/lib/validation";
import BibiAiForm from "./_components/BibiAiForm";
import BibiAiResponse from "./_components/BibiAiResponse";
import { useBibiAi } from "./BibiAiContext";

const BibiAi = () => {
  const {
    recipeData,
    recipeImage,
    setRecipeData,
    setRecipeImage,
    clearRecipe,
  } = useBibiAi();

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

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">Ask Bibi</h1>
        <p className="text-muted-foreground mb-2">
          Generate recipes with Bibi AI.
        </p>
      </div>
      <BibiAiForm
        onRecipeGenerated={handleRecipeGenerated}
        onGenerationStart={handleGenerationStart}
      />

      {recipeData && (
        <BibiAiResponse
          recipe={recipeData}
          image={recipeImage}
          onClear={clearRecipe}
        />
      )}
    </>
  );
};

export default BibiAi;
