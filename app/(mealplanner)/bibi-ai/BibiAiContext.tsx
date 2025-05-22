"use client";

import { RecipeInput } from "@/lib/validation";
import { createContext, ReactNode, useContext, useState } from "react";

type BibiAiContextType = {
  recipeData: RecipeInput | null;
  recipeImage: string;
  setRecipeData: (recipe: RecipeInput | null) => void;
  setRecipeImage: (image: string) => void;
  clearRecipe: () => void;
};

const BibiAiContext = createContext<BibiAiContextType | null>(null);

export const BibiAiProvider = ({ children }: { children: ReactNode }) => {
  const [recipeData, setRecipeData] = useState<RecipeInput | null>(null);
  const [recipeImage, setRecipeImage] = useState<string>("");

  const clearRecipe = () => {
    setRecipeData(null);
    setRecipeImage("");
  };

  return (
    <BibiAiContext.Provider
      value={{
        recipeData,
        recipeImage,
        setRecipeData,
        setRecipeImage,
        clearRecipe,
      }}
    >
      {children}
    </BibiAiContext.Provider>
  );
};

export const useBibiAi = () => {
  const context = useContext(BibiAiContext);
  if (!context) {
    throw new Error("useBibiAi must be used within a BibiAiProvider");
  }
  return context;
};
