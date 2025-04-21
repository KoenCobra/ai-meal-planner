import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  recipes: defineTable({
    userId: v.string(),
    title: v.string(),
    summary: v.string(),
    servings: v.number(),
    readyInMinutes: v.number(),
    image: v.optional(v.string()),
    diets: v.array(v.string()),
    instructions: v.string(),
    ingredients: v.array(v.string()),
    dishTypes: v.array(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_title", ["title"]),

  menus: defineTable({
    userId: v.string(),
    name: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_name", ["name"]),

  menusOnRecipes: defineTable({
    menuId: v.id("menus"),
    recipeId: v.id("recipes"),
  })
    .index("by_menu", ["menuId"])
    .index("by_recipe", ["recipeId"])
    .index("by_menu_and_recipe", ["menuId", "recipeId"]),
});
