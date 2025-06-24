"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookmarkPlus,
  Clock,
  Loader2,
  Plus,
  Printer,
  Share2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

import {
  cardVariants,
  imageContainerVariants,
  itemVariants,
  staggerContainer,
  titleVariants,
} from "@/lib/animation";
import AddToMenuDialog from "../../_components/AddToMenuDialog";
import { useAddToMenuDialogStore } from "../../_stores/useAddToMenuDialogStore";
import { useSyncIngredients } from "../_hooks/useSyncIngredients";

const RecipeDetails = () => {
  const params = useParams();
  const { open, recipeId, openDialog, closeDialog } = useAddToMenuDialogStore();
  const { handleSyncIngredients } = useSyncIngredients();
  const [activeTab, setActiveTab] = useState("ingredients");

  const { data: recipe, isLoading } = useQuery({
    ...convexQuery(api.recipes.getRecipe, {
      id: params.id as Id<"recipes">,
    }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center py-8">
        <p>Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-4 md:mt-10 pb-10">
      <div className="container mx-auto max-w-4xl">
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Card className="border-none shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 pt-0">
            <motion.div
              className="relative"
              variants={imageContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full h-[400px] md:h-[500px]">
                <Image
                  src={recipe?.imageUrl || recipe?.blurDataURL || ""}
                  alt={recipe?.title || "Recipe Image"}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  placeholder={recipe?.blurDataURL ? "blur" : "empty"}
                  blurDataURL={recipe?.blurDataURL || ""}
                  priority
                />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              ></motion.div>

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
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                <p className="text-muted-foreground">{recipe?.summary}</p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button
                    onClick={() => openDialog(params.id as Id<"recipes">)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add to Menu
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleSyncIngredients(params.id as Id<"recipes">)
                    }
                    className="gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Grocery List
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
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
                                transition: { duration: 0.1 },
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
                                  stiffness: 800,
                                  damping: 20,
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

                    {activeTab === "nutrition" && (
                      <TabsContent value="nutrition">
                        <motion.div
                          key="nutrition-content"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                          className="text-center py-12"
                        >
                          <div className="bg-muted rounded-full p-6 inline-flex mb-6">
                            <BookmarkPlus className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            Nutrition information coming soon
                          </h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            We&apos;re working on adding detailed nutritional
                            information for all recipes.
                          </p>
                        </motion.div>
                      </TabsContent>
                    )}
                  </AnimatePresence>
                </Tabs>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <AddToMenuDialog
        open={open}
        onOpenChange={closeDialog}
        recipeId={recipeId as Id<"recipes">}
      />
    </div>
  );
};

export default RecipeDetails;
