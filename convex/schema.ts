import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const applicationTables = {
  recipes: defineTable({
    userId: v.string(),
    title: v.string(),
    summary: v.string(),
    servings: v.number(),
    readyInMinutes: v.number(),
    storageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    diets: v.array(v.string()),
    instructions: v.object({
      steps: v.array(
        v.object({
          number: v.number(),
          step: v.string(),
        }),
      ),
    }),
    ingredients: v.array(
      v.object({
        name: v.string(),
        measures: v.object({
          amount: v.number(),
          unit: v.string(),
        }),
      }),
    ),
    // Flattened ingredients string for search
    ingredientsText: v.optional(v.string()),
    // Combined search text for title and ingredients
    searchText: v.optional(v.string()),
    dishType: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_title", ["title"])
    .index("by_user_and_dish_type", ["userId", "dishType"])
    .searchIndex("search_recipes", {
      searchField: "searchText",
      filterFields: ["userId"],
    }),

  menus: defineTable({
    userId: v.string(),
    name: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_name", ["name"])
    .index("by_user_and_name", ["userId", "name"]),
  menusOnRecipes: defineTable({
    menuId: v.id("menus"),
    recipeId: v.id("recipes"),
  })
    .index("by_menu", ["menuId"])
    .index("by_recipe", ["recipeId"])
    .index("by_menu_and_recipe", ["menuId", "recipeId"]),

  groceryItems: defineTable({
    userId: v.string(),
    name: v.string(),
    quantity: v.optional(v.string()),
    checked: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_checked", ["userId", "checked"])
    .index("by_user_and_name", ["userId", "name"])
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["userId"],
    }),
};

export default defineSchema(
  {
    ...applicationTables,
  },
  {
    schemaValidation: true,
    strictTableNameTypes: true,
  },
);
