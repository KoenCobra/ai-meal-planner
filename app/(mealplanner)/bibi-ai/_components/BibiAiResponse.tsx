import React from "react";
import { RecipeInput } from "@/lib/validation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BubuAiResponseProps {
  recipe: RecipeInput;
}

const AiResponse = ({ recipe }: BubuAiResponseProps) => {
  if (recipe?.error) {
    toast.error(recipe.error);
  }

  return (
    <>
      <div className="text-center mt-16">
        <h1 className="text-4xl font-bold">{recipe?.title.toUpperCase()}</h1>
        <p className="text-muted-foreground mb-2 text-sm">
          ({recipe?.diets?.join(" • ")})
        </p>
        <Button variant="secondary" className="mt-4 text-xl p-7">
          Add to a menu
          <Plus size={14} />
        </Button>
        <div className="border-b border-t border-border mt-6 py-3">
          <p className="text-muted-foreground max-w-xl mx-auto">
            {recipe?.summary}
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-6 mt-10 gap-8 lg:gap-16">
        <div className="lg:col-span-2">
          <p className="font-bold text-xl">Ingredients</p>
          <p className="text-muted-foreground mb-6">
            {recipe?.servings} servings | {recipe?.readyInMinutes} minutes
          </p>
          {recipe?.ingredients?.map((ingredient) => (
            <div key={ingredient.name} className="gap-5 mb-6">
              <p>
                {ingredient.name.charAt(0).toUpperCase() +
                  ingredient.name.slice(1)}
              </p>
              <p className="text-muted-foreground">
                {ingredient.measures.amount} {ingredient.measures.unit}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <p className="font-bold text-xl mb-6">Instructions</p>
          {recipe?.instructions?.steps?.map((step, index) => (
            <div key={step.number} className="mb-2 flex gap-2">
              <span className="text-right">{index + 1}.</span>
              <p className="mb-4">{step.step}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AiResponse;
