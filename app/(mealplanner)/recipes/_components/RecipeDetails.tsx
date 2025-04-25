"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";
import DeleteRecipeDialog from "../../_components/DeleteRecipeDialog";
import { useRecipeDelete } from "../_hooks/useRecipeDelete";

interface RecipeDetailsProps {
  menuId?: Id<"menus">;
}

const RecipeDetails = ({ menuId }: RecipeDetailsProps) => {
  const { user } = useUser();

  const {
    recipeToDelete,
    setRecipeToDelete,
    handleDelete,
    handleConfirmDelete,
  } = useRecipeDelete({
    userId: user?.id || "",
    menuId,
  });

  const menuRecipes = useQuery(
    api.menus.getMenuRecipes,
    menuId ? { userId: user?.id || "", menuId } : "skip",
  );

  const allRecipes = useQuery(api.recipes.getAllRecipes, {
    userId: user?.id || "",
  });

  const recipes = menuId ? menuRecipes : allRecipes;

  if (!user) return null;

  if (recipes === undefined) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  // Group recipes by dish type
  const recipesByType = {
    breakfast: recipes.filter((recipe) =>
      recipe.dishTypes?.some((type) => type.toLowerCase() === "breakfast"),
    ),
    lunch: recipes.filter((recipe) =>
      recipe.dishTypes?.some((type) => type.toLowerCase() === "lunch"),
    ),
    dinner: recipes.filter((recipe) =>
      recipe.dishTypes?.some((type) => type.toLowerCase() === "dinner"),
    ),
    snacks: recipes.filter((recipe) =>
      recipe.dishTypes?.some(
        (type) =>
          type.toLowerCase() === "snack" || type.toLowerCase() === "snacks",
      ),
    ),
  };

  type Recipe = NonNullable<typeof recipes>[number];

  const RecipeSection = ({
    title,
    recipes,
  }: {
    title: string;
    recipes: Recipe[];
  }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-primary">{title}</h2>
      {recipes.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">
          No {title.toLowerCase()} recipes yet
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              key={recipe._id}
              href={`/recipes/${recipe._id}`}
              className="relative group"
            >
              <Button
                size="icon"
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full z-10"
                onClick={(e) => handleDelete(e, recipe._id, recipe.title)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer pt-0">
                {recipe.image ? (
                  <div className="relative w-full h-48">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-48">
                    <Image
                      src="/images/image-placeholder.jpeg"
                      alt="image"
                      fill
                      className="rounded-md"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{recipe.title}</CardTitle>
                  <CardDescription>
                    {recipe.diets?.join(" • ") || "No specific diet"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Ready in {recipe.readyInMinutes} minutes • {recipe.servings}{" "}
                    servings
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {recipe.dishTypes?.map((type) => (
                      <span
                        key={type}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">
        {menuId ? "Menu Recipes" : "My Recipes"}
      </h1>

      <RecipeSection title="Breakfast" recipes={recipesByType.breakfast} />
      <RecipeSection title="Lunch" recipes={recipesByType.lunch} />
      <RecipeSection title="Dinner" recipes={recipesByType.dinner} />
      <RecipeSection title="Snacks" recipes={recipesByType.snacks} />

      <DeleteRecipeDialog
        open={!!recipeToDelete}
        onOpenChange={(open) => !open && setRecipeToDelete(null)}
        onConfirm={handleConfirmDelete}
        recipeName={recipeToDelete?.title || ""}
      />
    </div>
  );
};

export default RecipeDetails;
