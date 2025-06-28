"use client";

import { itemVariants, staggerContainer } from "@/lib/animation";
import { motion } from "framer-motion";
import {
  BookmarkPlus,
  Droplet,
  Dumbbell,
  Loader2,
  Wheat,
  Zap,
} from "lucide-react";

interface NutritionalValues {
  calories?: number;
  protein?: number;
  totalFat?: number;
  saturatedFat?: number;
  unsaturatedFat?: number;
  totalCarbohydrates?: number;
  sugars?: number;
  cholesterol?: number;
  sodium?: number;
  fiber?: number;
}

interface NutritionTabProps {
  nutritionalValues?: NutritionalValues | null;
  isLoading?: boolean;
  servings?: number;
}

const NutritionTab = ({
  nutritionalValues,
  isLoading,
  servings = 1,
}: NutritionTabProps) => {
  if (isLoading) {
    return (
      <motion.div
        key="nutrition-loading"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center py-12"
      >
        <div className="rounded-full p-6 inline-flex mb-6">
          <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Analyzing nutritional values...
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We&apos;re calculating nutritional information for this recipe.
        </p>
      </motion.div>
    );
  }

  if (!nutritionalValues) {
    return (
      <motion.div
        key="nutrition-not-available"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center py-12"
      >
        <div className="bg-muted rounded-full p-6 inline-flex mb-6">
          <BookmarkPlus className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Nutrition information not available
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Nutritional information is not available for this recipe.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="nutrition-content"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Nutrition Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          variants={itemVariants}
          className="bg-muted/50 p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Calories
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {Math.round((nutritionalValues.calories || 0) / servings)}
          </p>
          <p className="text-xs text-muted-foreground">per serving</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-muted/50 p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Protein
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {Math.round(((nutritionalValues.protein || 0) / servings) * 10) /
              10}
            g
          </p>
          <p className="text-xs text-muted-foreground">per serving</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-muted/50 p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Wheat className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Carbs
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {Math.round(
              ((nutritionalValues.totalCarbohydrates || 0) / servings) * 10,
            ) / 10}
            g
          </p>
          <p className="text-xs text-muted-foreground">per serving</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-muted/50 p-4 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Fat
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {Math.round(((nutritionalValues.totalFat || 0) / servings) * 10) /
              10}
            g
          </p>
          <p className="text-xs text-muted-foreground">per serving</p>
        </motion.div>
      </div>

      {/* Additional Nutrition Details */}
      <motion.div
        variants={itemVariants}
        className="bg-muted/50 rounded-lg p-4"
      >
        <h4 className="font-semibold mb-4">
          Additional Nutrition (per serving)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sugars</span>
            <span className="font-medium">
              {Math.round(((nutritionalValues?.sugars || 0) / servings) * 10) /
                10}
              g
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Saturated Fat</span>
            <span className="font-medium">
              {Math.round(
                ((nutritionalValues?.saturatedFat || 0) / servings) * 10,
              ) / 10}
              g
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Unsaturated Fat</span>
            <span className="font-medium">
              {Math.round(
                ((nutritionalValues?.unsaturatedFat || 0) / servings) * 10,
              ) / 10}
              g
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cholesterol</span>
            <span className="font-medium">
              {Math.round(
                ((nutritionalValues?.cholesterol || 0) / servings) * 10,
              ) / 10}
              mg
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sodium</span>
            <span className="font-medium">
              {Math.round(((nutritionalValues?.sodium || 0) / servings) * 10) /
                10}
              mg
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fiber</span>
            <span className="font-medium">
              {Math.round(((nutritionalValues?.fiber || 0) / servings) * 10) /
                10}
              g
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NutritionTab;
