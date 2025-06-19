"use client";

import type { Id } from "@/convex/_generated/dataModel";
import { createContext, ReactNode, useContext, useState } from "react";

type BubuAiContextType = {
  description: string;
  selectedImage: File | null;
  imagePreview: string | null;
  savedRecipeId: Id<"recipes"> | null;
  setDescription: (description: string) => void;
  setSelectedImage: (image: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  setSavedRecipeId: (id: Id<"recipes"> | null) => void;
  clearForm: () => void;
};

const BubuAiContext = createContext<BubuAiContextType | null>(null);

export const BubuAiProvider = ({ children }: { children: ReactNode }) => {
  const [description, setDescription] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [savedRecipeId, setSavedRecipeId] = useState<Id<"recipes"> | null>(
    null,
  );

  const clearForm = () => {
    setDescription("");
    setSelectedImage(null);
    setImagePreview(null);
    setSavedRecipeId(null);
  };

  return (
    <BubuAiContext.Provider
      value={{
        description,
        selectedImage,
        imagePreview,
        savedRecipeId,
        setDescription,
        setSelectedImage,
        setImagePreview,
        setSavedRecipeId,
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
