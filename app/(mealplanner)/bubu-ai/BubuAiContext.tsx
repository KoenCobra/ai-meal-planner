"use client";

import type { Id } from "@/convex/_generated/dataModel";
import { RecipeInput } from "@/lib/validation";
import { createContext, ReactNode, useContext, useState } from "react";

type BubuAiContextType = {
  recipeData: RecipeInput | null;
  description: string;
  selectedImage: File | null;
  imagePreview: string | null;
  savedRecipeId: Id<"recipes"> | null;
  setRecipeData: (recipe: RecipeInput | null) => void;
  setDescription: (description: string) => void;
  setSelectedImage: (image: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  setSavedRecipeId: (id: Id<"recipes"> | null) => void;
  clearRecipe: () => void;
  clearForm: () => void;
};

const BubuAiContext = createContext<BubuAiContextType | null>(null);

export const BubuAiProvider = ({ children }: { children: ReactNode }) => {
  const [recipeData, setRecipeData] = useState<RecipeInput | null>(null);
  const [description, setDescription] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [savedRecipeId, setSavedRecipeId] = useState<Id<"recipes"> | null>(
    null,
  );

  const clearRecipe = () => {
    setRecipeData(null);
    setSavedRecipeId(null);
  };

  const clearForm = () => {
    setDescription("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <BubuAiContext.Provider
      value={{
        recipeData,
        description,
        selectedImage,
        imagePreview,
        savedRecipeId,
        setRecipeData,
        setDescription,
        setSelectedImage,
        setImagePreview,
        setSavedRecipeId,
        clearRecipe,
        clearForm,
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
