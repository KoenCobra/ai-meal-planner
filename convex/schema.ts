import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const applicationTables = {
  recipes: defineTable({
    userId: v.string(),
    title: v.string(),
    summary: v.string(),
    servings: v.number(),
    readyInMinutes: v.number(),
    imageId: v.optional(v.id("_storage")),
    blurDataURL: v.optional(v.string()),
    categories: v.array(v.string()),
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
    ingredientsText: v.optional(v.string()),
    searchText: v.optional(v.string()),
    dishType: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_dish_type", ["userId", "dishType"])
    .searchIndex("search_recipes", {
      searchField: "searchText",
      filterFields: ["userId"],
    }),

  nutritionalValues: defineTable({
    recipeId: v.id("recipes"),
    calories: v.optional(v.number()),
    protein: v.optional(v.number()),
    totalFat: v.optional(v.number()),
    saturatedFat: v.optional(v.number()),
    unsaturatedFat: v.optional(v.number()),
    totalCarbohydrates: v.optional(v.number()),
    sugars: v.optional(v.number()),
    cholesterol: v.optional(v.number()),
    sodium: v.optional(v.number()),
    fiber: v.optional(v.number()),
  }).index("by_recipe", ["recipeId"]),

  menus: defineTable({
    userId: v.string(),
    name: v.string(),
  }).index("by_user", ["userId"]),
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
    unit: v.optional(v.string()),
    quantity: v.optional(v.number()),
    checked: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_name_and_unit", ["userId", "name", "unit"]),
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
