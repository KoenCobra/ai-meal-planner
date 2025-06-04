"use client";

import type { Id } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { RecipeCard } from "./RecipeCard";

interface RecipeGridProps {
  recipes: Array<{
    _id: Id<"recipes">;
    title: string;
    readyInMinutes: number;
    servings: number;
    imageUrl: string;
    categories: string[];
    dishType: string;
  }>;
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

export const RecipeGrid = ({ recipes, onDelete }: RecipeGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
        >
          <RecipeCard recipe={recipe} onDelete={onDelete} />
        </motion.div>
      ))}
    </div>
  );
};
