"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { RecipeInput } from "@/lib/validation";
import BubuAiForm from "./_components/BubuAiForm";
import BubuAiResponse from "./_components/BubuAiResponse";
import Header from "./_components/Header";
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
    clearRecipe();
  };

  const handleImageGenerationAborted = () => {
    clearRecipe();
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto g-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 p-0 pt-4">
          <CardContent className="p-0 px-4">
            <BubuAiForm
              onRecipeGenerated={handleRecipeGenerated}
              onGenerationStart={handleGenerationStart}
              onImageGenerationAborted={handleImageGenerationAborted}
            />
          </CardContent>
        </Card>

        {recipeData && (
          <div className="mt-8 pb-6 animate-fade-in">
            <BubuAiResponse
              recipe={recipeData}
              image={recipeImage}
              onClear={clearRecipe}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BibiAi;
