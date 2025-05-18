import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";

export const useRecipes = (userId: string, menuId?: Id<"menus">) => {
  const { data: menuRecipes } = useQuery({
    ...convexQuery(
      api.menus.getMenuRecipes,
      menuId ? { userId, menuId } : "skip",
    ),
  });

  const { data: allRecipes } = useQuery({
    ...convexQuery(api.recipes.getAllRecipes, {
      userId,
    }),
  });

  const recipes = menuId ? menuRecipes : allRecipes;

  const groupRecipesByType = (recipeData: typeof recipes) => {
    if (!recipeData) return null;

    return {
      breakfast: recipeData.page.filter((recipe) =>
        recipe.dishTypes?.some((type) => type.toLowerCase() === "breakfast"),
      ),
      lunch: recipeData.page.filter((recipe) =>
        recipe.dishTypes?.some((type) => type.toLowerCase() === "lunch"),
      ),
      dinner: recipeData.page.filter((recipe) =>
        recipe.dishTypes?.some((type) => type.toLowerCase() === "dinner"),
      ),
      snacks: recipeData.page.filter((recipe) =>
        recipe.dishTypes?.some(
          (type) =>
            type.toLowerCase() === "snack" || type.toLowerCase() === "snacks",
        ),
      ),
    };
  };

  return {
    recipesByType: recipes ? groupRecipesByType(recipes) : null,
    loading: recipes === undefined,
  };
};
