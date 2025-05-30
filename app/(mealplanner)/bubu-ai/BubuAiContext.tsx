"use client";

import { RecipeInput } from "@/lib/validation";
import { createContext, ReactNode, useContext, useState } from "react";

type BubuAiContextType = {
  recipeData: RecipeInput | null;
  recipeImage: string;
  setRecipeData: (recipe: RecipeInput | null) => void;
  setRecipeImage: (image: string) => void;
  clearRecipe: () => void;
};

const BubuAiContext = createContext<BubuAiContextType | null>(null);

export const BubuAiProvider = ({ children }: { children: ReactNode }) => {
  const [recipeData, setRecipeData] = useState<RecipeInput | null>(null);
  const [recipeImage, setRecipeImage] = useState<string>("");

  const clearRecipe = () => {
    setRecipeData(null);
    setRecipeImage("");
  };

  return (
    <BubuAiContext.Provider
      value={{
        recipeData,
        recipeImage,
        setRecipeData,
        setRecipeImage,
        clearRecipe,
      }}
    >
      {children}
    </BubuAiContext.Provider>
  );
};

export const useBubuAi = () => {
  const context = useContext(BubuAiContext);
  if (!context) {
    throw new Error("useBubuAi must be used within a BubuAiProvider");
  }
  return context;
};
