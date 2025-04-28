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
import { MoreVertical, Trash, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";
import DeleteRecipeDialog from "../../_components/DeleteRecipeDialog";
import { useRecipeDelete } from "../_hooks/useRecipeDelete";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSyncIngredients } from "../_hooks/useSyncIngredients";

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

  const { handleSyncIngredients } = useSyncIngredients(user?.id || "");

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

  const RecipeGrid = ({ recipes }: { recipes: Recipe[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Link
          key={recipe._id}
          href={`/recipes/${recipe._id}`}
          className="relative group"
        >
          <div className="absolute right-2 top-2 z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="rounded-full bg-gray-300">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(e, recipe._id, recipe.title);
                  }}
                  className="text-destructive"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Recipe
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    handleSyncIngredients(recipe._id);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Grocery List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">
        {menuId ? "Menu Recipes" : "My Recipes"}
      </h1>

      <Tabs defaultValue="breakfast" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
        </TabsList>

        <TabsContent value="breakfast" className="mt-6">
          {recipesByType.breakfast.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No breakfast recipes yet
            </p>
          ) : (
            <RecipeGrid recipes={recipesByType.breakfast} />
          )}
        </TabsContent>

        <TabsContent value="lunch" className="mt-6">
          {recipesByType.lunch.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No lunch recipes yet
            </p>
          ) : (
            <RecipeGrid recipes={recipesByType.lunch} />
          )}
        </TabsContent>

        <TabsContent value="dinner" className="mt-6">
          {recipesByType.dinner.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No dinner recipes yet
            </p>
          ) : (
            <RecipeGrid recipes={recipesByType.dinner} />
          )}
        </TabsContent>

        <TabsContent value="snacks" className="mt-6">
          {recipesByType.snacks.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No snack recipes yet
            </p>
          ) : (
            <RecipeGrid recipes={recipesByType.snacks} />
          )}
        </TabsContent>
      </Tabs>

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
