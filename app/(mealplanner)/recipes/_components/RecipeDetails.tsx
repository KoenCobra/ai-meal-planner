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
import { MoreVertical, Trash, ShoppingCart, Camera } from "lucide-react";
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
  const [open, setOpen] = useState(false);
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

  const RecipeImage = ({ recipe }: { recipe: Recipe }) => {
    const { user } = useUser();
    const generateUploadUrl = useMutation(api.recipes.images.generateUploadUrl);
    const updateRecipeImage = useMutation(api.recipes.images.updateRecipeImage);
    const imageUrl = useQuery(
      api.recipes.images.getImageUrl,
      recipe.storageId ? { storageId: recipe.storageId } : "skip",
    );

    const handleImageUpload = async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.target.files?.[0];
      if (!file || !user) return;

      try {
        // Get the upload URL
        const postUrl = await generateUploadUrl({ userId: user.id });

        // Upload the file
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!result.ok) {
          throw new Error("Failed to upload image");
        }

        const { storageId } = await result.json();

        // Update the recipe with the new storage ID
        await updateRecipeImage({
          userId: user.id,
          recipeId: recipe._id,
          storageId,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    return (
      <div
        className="relative w-full h-48"
        onClick={(e) => e.stopPropagation()}
      >
        {imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={recipe.title}
              fill
              className="object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center">
              <label className="cursor-pointer p-4 rounded-full bg-white bg-opacity-0 hover:bg-opacity-90 transition-all transform hover:scale-110">
                <Camera className="h-6 w-6 text-transparent hover:text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  onClick={(e) => e.stopPropagation()}
                />
              </label>
            </div>
          </div>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gray-100 rounded-t-lg relative group"
            onClick={(e) => e.stopPropagation()}
          >
            <label
              className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Camera className="h-8 w-8 text-gray-400 group-hover:text-gray-600 transition-colors" />
              <span className="text-sm text-gray-500 mt-2">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
          </div>
        )}
      </div>
    );
  };

  const RecipeGrid = ({ recipes }: { recipes: Recipe[] }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            key={recipe._id}
            href={`/recipes/${recipe._id}`}
            className="relative group"
          >
            <div className="absolute right-2 top-2 z-10">
              <DropdownMenu open={open} onOpenChange={setOpen}>
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
                    className="text-destructive cursor-pointer"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Recipe
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      handleSyncIngredients(recipe._id);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Grocery List
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Card className="h-full hover:shadow-lg relative transition-shadow cursor-pointer pt-0">
              <RecipeImage recipe={recipe} />
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
  };

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
