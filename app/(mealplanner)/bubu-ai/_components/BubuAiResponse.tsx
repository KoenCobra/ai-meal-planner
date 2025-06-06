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
  const [activeTab, setActiveTab] = useState("ingredients");

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card className="border-none shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 pt-0">
        <motion.div
          className="relative"
          variants={imageContainerVariants}
          initial="hidden"
          animate="visible"
        >
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
                  onLoad={handleImageLoad}
                  quality={50}
                />
                {!isImageLoaded && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900"
                    animate={{
                      background: [
                        "linear-gradient(45deg, #f4f4f5, #e4e4e7, #d4d4d8)",
                        "linear-gradient(45deg, #e4e4e7, #d4d4d8, #f4f4f5)",
                        "linear-gradient(45deg, #d4d4d8, #f4f4f5, #e4e4e7)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-0 backdrop-blur-sm bg-white/20 dark:bg-black/20" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                          "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                          "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                          "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                )}
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              ></motion.div>
            </>
          ) : recipe?.error ? (
            <div className="relative w-full h-[400px] md:h-[500px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          ) : (
            <div className="relative w-full h-[400px] md:h-[500px]">
              {!isImageLoaded && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #f4f4f5, #e4e4e7, #d4d4d8)",
                      "linear-gradient(45deg, #e4e4e7, #d4d4d8, #f4f4f5)",
                      "linear-gradient(45deg, #d4d4d8, #f4f4f5, #e4e4e7)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/20 dark:bg-black/20" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              )}
            </div>
          )}

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex flex-wrap gap-2 mb-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {recipe?.categories?.map((category, index) => (
                <motion.div key={index} variants={itemVariants}>
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
              variants={titleVariants}
            >
              {recipe?.title}
            </motion.h2>
            <motion.div
              className="flex flex-wrap items-center gap-4 text-sm"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
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
          </motion.div>
        </motion.div>

        <CardContent className="p-4">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-muted-foreground">{recipe?.summary}</p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Tabs
              defaultValue="ingredients"
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {activeTab === "ingredients" && (
                  <TabsContent value="ingredients" className="space-y-4">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {recipe?.ingredients?.map((ingredient, index) => (
                        <motion.div
                          key={`${ingredient.name}-${index}`}
                          variants={itemVariants}
                          whileHover={{
                            scale: 1.02,
                            boxShadow:
                              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          }}
                          className="flex items-start gap-3 p-3 rounded-lg border bg-background/50"
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
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                )}

                {activeTab === "instructions" && (
                  <TabsContent value="instructions">
                    <motion.div
                      className="space-y-6"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {recipe?.instructions?.steps?.map((step) => (
                        <motion.div
                          key={step.number}
                          className="flex gap-4"
                          variants={itemVariants}
                        >
                          <motion.div
                            className="size-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium"
                            whileHover={{
                              scale: 1.2,
                              backgroundColor: "var(--primary)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            {step.number}
                          </motion.div>
                          <p className="flex-1">{step.step}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                )}
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BubuAiResponse;
