"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { Printer, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import AddToMenuDialog from "../../_components/AddToMenuDialog";
import { useAddToMenuDialogStore } from "../../_stores/useAddToMenuDialogStore";
import RecipeDetailHeader from "../_components/RecipeDetailHeader";
import RecipeDetailInstructions from "../_components/RecipeDetailInstructions";
import { useSyncIngredients } from "../_hooks/useSyncIngredients";

const RecipeDetails = () => {
  const params = useParams();
  const { user } = useUser();
  const { open, recipeId, openDialog, closeDialog } = useAddToMenuDialogStore();
  const { handleSyncIngredients } = useSyncIngredients(user?.id || "");

  const { data: recipe } = useQuery({
    ...convexQuery(api.recipes.getRecipe, {
      userId: user?.id || "",
      id: params.id as Id<"recipes">,
    }),
  });

  if (!user) return null;

  if (recipe === undefined) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (recipe === null) {
    return <div className="text-center mt-8">Recipe not found.</div>;
  }

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">{recipe.title.toUpperCase()}</h1>
          <p className="text-muted-foreground mb-2">
            {recipe.diets?.join(" • ")}
          </p>
          <div className="text-center border-t border-border">
            <h2 className="text-xl text-muted-foreground mt-5">
              Print or share this recipe
            </h2>
            <div className="flex justify-center gap-6 color-muted-foreground py-5">
              <Printer className="size-5 cursor-pointer text-muted-foreground " />
              <Image
                className="cursor-pointer"
                src="/facebook.svg"
                alt="facebook"
                width={18}
                height={18}
              />
              <Image
                className="cursor-pointer"
                src="/instagram.svg"
                alt="instagram"
                width={18}
                height={18}
              />
              <Image
                className="cursor-pointer"
                src="/x.svg"
                alt="x"
                width={18}
                height={18}
              />
              <Image
                className="cursor-pointer"
                src="/pinterest.svg"
                alt="pinterest"
                width={18}
                height={18}
              />
            </div>
          </div>
          <div className="flex justify-center flex-wrap gap-4 mt-4 mb-6">
            <Button
              variant="outline"
              className="text-2xl p-7"
              onClick={() => openDialog(params.id as Id<"recipes">)}
            >
              ADD +
            </Button>
            <Button
              variant="outline"
              className="text-2xl p-7"
              onClick={() => handleSyncIngredients(params.id as Id<"recipes">)}
            >
              <ShoppingCart className="mr-2 h-6 w-6" />
              Add to Grocery List
            </Button>
          </div>
        </div>
        <Tabs defaultValue="recipe">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="recipe">RECIPE</TabsTrigger>
            <TabsTrigger value="nutrition">NUTRITION</TabsTrigger>
          </TabsList>
          <TabsContent value="recipe">
            <RecipeDetailHeader recipe={recipe} />

            <RecipeDetailInstructions
              ingredients={recipe.ingredients.map(
                (ingredient) =>
                  `${ingredient.name} - ${ingredient.measures.amount} ${ingredient.measures.unit}`,
              )}
              instructions={recipe.instructions.steps
                .map((step) => `${step.number}. ${step.step}`)
                .join("\n")}
              servings={recipe.servings}
              readyInMinutes={recipe.readyInMinutes}
            />
          </TabsContent>
          <TabsContent value="nutrition"></TabsContent>
        </Tabs>
      </div>

      <AddToMenuDialog
        open={open}
        onOpenChange={closeDialog}
        recipeId={recipeId as Id<"recipes">}
      />
    </>
  );
};

export default RecipeDetails;
