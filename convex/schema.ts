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
    diets: v.array(v.string()),
    instructions: v.object({
      name: v.string(),
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
    dishTypes: v.array(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_title", ["title"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["userId"],
    })
    .searchIndex("search_ingredients", {
      searchField: "ingredients",
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
    .searchIndex("search_name", {
      searchField: "name",
      filterFields: ["userId"],
    }),
};

export default defineSchema({
  ...applicationTables,
});
