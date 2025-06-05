"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { RecipeInput } from "@/lib/validation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { BookmarkIcon, Clock, Loader2, Trash2, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface BubuAiResponseProps {
  recipe: RecipeInput;
  image: string;
  onClear?: () => void;
}

const BubuAiResponse = ({ recipe, image, onClear }: BubuAiResponseProps) => {
  const { user } = useUser();
  const [savedRecipeId, setSavedRecipeId] =
    React.useState<Id<"recipes"> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const createRecipe = useMutation(api.recipes.createRecipe);

  // Create a simple blur data URL
  const createBlurDataURL = () => {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjNmNGY2O3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgLz4KPHN2Zz4K";
  };

  // Reset state when recipe changes
  useEffect(() => {
    setSavedRecipeId(null);
    setIsImageLoaded(false);
  }, [recipe, image]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setIsSaving(true);

      if (!image || !recipe) return;

      const newRecipeId = await createRecipe({
        userId: user.id,
        title: recipe.title,
        summary: recipe.summary,
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        categories: recipe.categories,
        instructions: {
          steps: recipe.instructions.steps,
        },
        ingredients: recipe.ingredients,
        dishType: recipe.dishType,
        imageUrl: image,
      });

      setSavedRecipeId(newRecipeId);
      toast.success("Recipe saved successfully!");
    } catch (error) {
      toast.error("Failed to save recipe");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
      },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.1,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      x: 10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="border-none shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 pt-0">
        <motion.div className="relative" variants={itemVariants}>
          {image ? (
            <>
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  placeholder="blur"
                  blurDataURL={createBlurDataURL()}
                  priority
                  onLoad={handleImageLoad}
                  quality={50}
                />
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center bg-muted pt-20">
                    <div className="relative w-16 h-16 mb-3">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                      <div
                        className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"
                        style={{
                          animationDirection: "reverse",
                          animationDuration: "1.5s",
                        }}
                      ></div>
                    </div>
                    <p className="text-muted-foreground font-medium">
                      Loading image...
                    </p>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </>
          ) : recipe?.error ? (
            <div className="relative w-full h-[400px] md:h-[500px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          ) : (
            <div className="relative w-full h-[400px] md:h-[500px]">
              <div className="absolute inset-0 flex flex-col items-center bg-muted pt-20">
                <div className="relative w-16 h-16 mb-3">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full border-4 border-t-transparent border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
                <p className="text-muted-foreground font-medium">
                  Loading image...
                </p>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.div
              className="flex flex-wrap gap-2 mb-2"
              variants={containerVariants}
            >
              {recipe?.categories?.map((category, index) => (
                <motion.div key={`category-${index}`} variants={itemVariants}>
                  <Badge
                    variant="outline"
                    className="bg-black/40 backdrop-blur-sm border-white/20 text-white"
                  >
                    {category}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-2"
              variants={itemVariants}
            >
              {recipe?.title}
            </motion.h2>
            <motion.div
              className="flex flex-wrap items-center gap-4 text-sm"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-center gap-1"
                variants={itemVariants}
              >
                <Clock className="h-4 w-4" />
                <span>{recipe?.readyInMinutes} min</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-1"
                variants={itemVariants}
              >
                <Users className="h-4 w-4" />
                <span>{recipe?.servings} servings</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <CardContent className="p-4">
          <motion.div className="mb-6" variants={itemVariants}>
            <p className="text-muted-foreground">{recipe?.summary}</p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 mb-6"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleSave}
                disabled={
                  !!savedRecipeId ||
                  isSaving ||
                  !isImageLoaded ||
                  !!recipe?.error
                }
                className="gap-2"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : savedRecipeId ? (
                  <BookmarkIcon className="h-4 w-4 fill-current" />
                ) : (
                  <BookmarkIcon className="h-4 w-4" />
                )}
                {isSaving
                  ? "Saving..."
                  : savedRecipeId
                    ? "Saved"
                    : "Save Recipe"}
              </Button>
            </motion.div>

            {onClear && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={isSaving}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
              </motion.div>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs
              defaultValue="ingredients"
              className="w-full"
              style={{ scrollMarginTop: "0px" }}
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <TabsContent value="ingredients" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recipe?.ingredients?.map((ingredient, index) => (
                        <div
                          key={`ingredient-${index}`}
                          className="flex items-start gap-3 p-3 rounded-lg border bg-background/50 hover:shadow-md transition-shadow"
                        >
                          <div>
                            <p className="font-medium">
                              {ingredient.name?.charAt(0).toUpperCase() +
                                ingredient.name?.slice(1)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {ingredient.measures?.amount === 0
                                ? "to taste"
                                : `${ingredient.measures?.amount} ${ingredient.measures?.unit || ""}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="instructions">
                    <div className="space-y-6">
                      {recipe?.instructions?.steps?.map((step) => (
                        <div key={`step-${step.number}`} className="flex gap-4">
                          <div className="size-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            {step.number}
                          </div>
                          <p className="flex-1">{step.step}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BubuAiResponse;
