"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import DeleteRecipeDialog from "../../_components/DeleteRecipeDialog";
import { useRecipeDelete } from "../_hooks/useRecipeDelete";
import { useSyncIngredients } from "../_hooks/useSyncIngredients";
import { RecipeCard } from "./RecipeCard";

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

  const { data: menuRecipes } = useQuery({
    ...convexQuery(
      api.menus.getMenuRecipes,
      menuId ? { userId: user?.id || "", menuId } : "skip",
    ),
  });

  const { data: allRecipes } = useQuery({
    ...convexQuery(api.recipes.getAllRecipes, {
      userId: user?.id || "",
    }),
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

  const RecipeGrid = ({ recipes }: { recipes: Recipe[] }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
            onSyncIngredients={handleSyncIngredients}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto py-8 px-2">
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
