"use client";

import React, { useState } from "react";
import { RecipeInput } from "@/lib/validation";
import BibiAiForm from "./_components/BibiAiForm";
import BibiAiResponse from "./_components/BibiAiResponse";

const BibiAi = () => {
  const [recipeData, setRecipeData] = useState<RecipeInput | null>(null);

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">Ask Bibi</h1>
        <p className="text-muted-foreground mb-2">
          Generate recipes with Bibi AI.
        </p>
      </div>
      <BibiAiForm onRecipeGenerated={setRecipeData} />

      {recipeData && <BibiAiResponse recipe={recipeData} />}
    </>
  );
};

export default BibiAi;
