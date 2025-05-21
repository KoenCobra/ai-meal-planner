"use client";

import { RecipeInput } from "@/lib/validation";
import { useEffect, useState } from "react";
import BibiAiForm from "./_components/BibiAiForm";
import BibiAiResponse from "./_components/BibiAiResponse";

// Local storage keys
const RECIPE_STORAGE_KEY = "bibi-ai-recipe";
const IMAGE_STORAGE_KEY = "bibi-ai-image";

const BibiAi = () => {
  const [recipeData, setRecipeData] = useState<RecipeInput | null>(null);
  const [recipeImage, setRecipeImage] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from local storage on initial render
  useEffect(() => {
    const storedRecipe = localStorage.getItem(RECIPE_STORAGE_KEY);
    const storedImage = localStorage.getItem(IMAGE_STORAGE_KEY);

    if (storedRecipe) {
      try {
        setRecipeData(JSON.parse(storedRecipe));
      } catch (error) {
        console.error("Failed to parse stored recipe:", error);
        localStorage.removeItem(RECIPE_STORAGE_KEY);
      }
    }

    if (storedImage) {
      setRecipeImage(storedImage);
    }

    setIsLoaded(true);
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    if (!isLoaded) return;

    if (recipeData) {
      localStorage.setItem(RECIPE_STORAGE_KEY, JSON.stringify(recipeData));
    } else {
      localStorage.removeItem(RECIPE_STORAGE_KEY);
    }

    if (recipeImage) {
      localStorage.setItem(IMAGE_STORAGE_KEY, recipeImage);
    } else {
      localStorage.removeItem(IMAGE_STORAGE_KEY);
    }
  }, [recipeData, recipeImage, isLoaded]);

  const handleRecipeGenerated = (recipe: RecipeInput, image?: string) => {
    setRecipeData(recipe);
    if (image) {
      setRecipeImage(image);
    }
  };

  const handleGenerationStart = () => {
    // Clear previous recipe and image when generation starts
    setRecipeData(null);
    setRecipeImage("");
  };

  const handleClearRecipe = () => {
    setRecipeData(null);
    setRecipeImage("");
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
        onClear={handleClearRecipe}
      />

      {recipeData && (
        <BibiAiResponse
          recipe={recipeData}
          image={recipeImage}
          onClear={handleClearRecipe}
        />
      )}
    </>
  );
};

export default BibiAi;
