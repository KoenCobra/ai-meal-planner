import React from "react";
import Image from "next/image";
import { AnalyzedInstruction, ExtendedIngredient } from "@/app/types/recipe";

interface RecipeDetailInstructionsProps {
  extendedIngredients: ExtendedIngredient[];
  analyzedInstructions: AnalyzedInstruction[];
  servings: number;
  readyInMinutes: number;
}

const RecipeDetailInstructions = ({
  servings,
  readyInMinutes,
  extendedIngredients,
  analyzedInstructions,
}: RecipeDetailInstructionsProps) => {
  return (
    <div className="grid lg:grid-cols-6 mt-10 gap-8 lg:gap-16">
      <div className="lg:col-span-2">
        <p className="font-bold text-xl">Ingredients</p>
        <p className="text-muted-foreground mb-6">
          {servings} servings | {readyInMinutes} minutes
        </p>
        {extendedIngredients.map((ingredient) => (
          <div
            key={`${ingredient.id}-${ingredient.originalName}-${ingredient.image}`}
            className="flex  items-center gap-5 mb-6"
          >
            <div className="flex gap-2">
              <Image
                src={
                  ingredient.image
                    ? `https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`
                    : "/images/image-placeholder.jpeg"
                }
                alt={ingredient.originalName}
                width={40}
                height={40}
              />
            </div>
            <div>
              <p>
                {ingredient.originalName.charAt(0).toUpperCase() +
                  ingredient.originalName.slice(1)}
              </p>
              <p className="text-muted-foreground">
                {ingredient.measures.us.amount}{" "}
                {ingredient.measures.us.unitShort}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:col-span-4">
        <p className="font-bold text-xl mb-6">Instructions</p>
        {analyzedInstructions.map((instruction) => (
          <div key={instruction.name} className="mb-6">
            {instruction.steps.map((step, index) => (
              <div key={step.number} className="mb-2 flex gap-2">
                <span className="text-right">{index + 1}.</span>
                <p className="mb-4">{step.step}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetailInstructions;
