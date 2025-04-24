"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
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
import DeleteRecipeDialog from "../_components/DeleteRecipeDialog";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const RecipesPage = () => {
  const { user } = useUser();
  const [recipeToDelete, setRecipeToDelete] = useState<{
    id: Id<"recipes">;
    title: string;
  } | null>(null);

  const recipes = useQuery(api.recipes.getAllRecipes, {
    userId: user?.id || "",
  });
  const deleteRecipe = useMutation(
    api.recipes.deleteRecipe,
  ).withOptimisticUpdate((localStore, args) => {
    const recipes = localStore.getQuery(api.recipes.getAllRecipes, {
      userId: args.userId,
    });
    if (recipes) {
      localStore.setQuery(
        api.recipes.getAllRecipes,
        { userId: args.userId },
        recipes.filter((recipe) => recipe._id !== args.id),
      );
    }
  });

  if (!user) return null;

  if (recipes === undefined) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  const handleDelete = (
    e: React.MouseEvent,
    recipeId: Id<"recipes">,
    title: string,
  ) => {
    e.preventDefault(); // Prevent navigation
    setRecipeToDelete({ id: recipeId, title });
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      await deleteRecipe({
        userId: user.id || "",
        id: recipeToDelete.id,
      });
      toast.success("Recipe deleted successfully");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError ? error.data : "Error deleting recipe";
      toast.error(errorMessage);
    }

    setRecipeToDelete(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer pt-0 ">
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

      <DeleteRecipeDialog
        open={!!recipeToDelete}
        onOpenChange={(open) => !open && setRecipeToDelete(null)}
        onConfirm={handleConfirmDelete}
        recipeName={recipeToDelete?.title || ""}
      />
    </div>
  );
};

export default RecipesPage;
