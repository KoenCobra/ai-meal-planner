import React from "react";

interface RecipeDetailInstructionsProps {
  ingredients: string[];
  instructions: string;
  servings: number;
  readyInMinutes: number;
}

const RecipeDetailInstructions = ({
  servings,
  readyInMinutes,
  ingredients,
  instructions,
}: RecipeDetailInstructionsProps) => {
  return (
    <div className="grid lg:grid-cols-6 mt-10 gap-8 lg:gap-16">
      <div className="lg:col-span-2">
        <p className="font-bold text-xl">Ingredients</p>
        <p className="text-muted-foreground mb-6">
          {servings} servings | {readyInMinutes} minutes
        </p>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="mb-6">
            <p>{ingredient}</p>
          </div>
        ))}
      </div>
      <div className="lg:col-span-4">
        <p className="font-bold text-xl mb-6">Instructions</p>
        {instructions.split("\n").map((instruction, index) => (
          <div key={index} className="mb-2 flex gap-2">
            <p className="mb-4">{instruction}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetailInstructions;
