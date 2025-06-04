"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { RecipeInput } from "@/lib/validation";
import { AnimatePresence, motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <div className="max-w-3xl mx-auto g-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
        >
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 p-0 pt-4">
            <CardContent className="p-0 px-4">
              <BubuAiForm
                onRecipeGenerated={handleRecipeGenerated}
                onGenerationStart={handleGenerationStart}
                onImageGenerationAborted={handleImageGenerationAborted}
              />
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {recipeData && (
            <motion.div
              key="recipe-response"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="mt-8 pb-6"
            >
              <BubuAiResponse
                recipe={recipeData}
                image={recipeImage}
                onClear={clearRecipe}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BibiAi;
