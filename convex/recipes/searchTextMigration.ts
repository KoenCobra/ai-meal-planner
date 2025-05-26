import { internalMutation } from "../_generated/server";

export const migrateRecipesToAddSearchText = internalMutation({
  handler: async (ctx) => {
    const recipes = await ctx.db.query("recipes").collect();

    let updated = 0;
    for (const recipe of recipes) {
      // Skip if searchText already exists
      if (recipe.searchText) continue;

      // Create ingredients text if it doesn't exist
      const ingredientsText =
        recipe.ingredientsText ||
        recipe.ingredients.map((ingredient) => ingredient.name).join(" ");

      // Create combined search text
      const searchText = `${recipe.title} ${ingredientsText}`;

      await ctx.db.patch(recipe._id, {
        ingredientsText,
        searchText,
      });

      updated++;
    }

    console.log(`Updated ${updated} recipes with searchText field`);
    return { updated };
  },
});
