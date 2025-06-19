"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import {
  cardVariants,
  imageContainerVariants,
  itemVariants,
  staggerContainer,
  titleVariants,
} from "@/lib/animation";
import { RecipeInput } from "@/lib/validation";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookmarkIcon,
  Clock,
  Loader2,
  MoreHorizontal,
  Plus,
  ShoppingCart,
  Trash,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import AddToMenuDialog from "../../_components/AddToMenuDialog";
import { useAddToMenuDialogStore } from "../../_stores/useAddToMenuDialogStore";
import { useSyncIngredients } from "../../recipes/_hooks/useSyncIngredients";
import { useBubuAi } from "../BubuAiContext";

interface BubuAiResponseProps {
  onClear?: () => void;
}

const BubuAiResponse = ({ onClear }: BubuAiResponseProps) => {
  const { user } = useUser();
  const { clearForm, savedRecipeId, setSavedRecipeId } = useBubuAi();
  const [isSaving, setIsSaving] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: recipe } = useQuery<RecipeInput>({
    queryKey: ["generate-recipe"],
  });

  const { data: recipeImage } = useQuery<string>({
    queryKey: ["generate-image"],
  });

  const createRecipe = useMutation(api.recipes.createRecipe);
  const deleteRecipe = useMutation(api.recipes.deleteRecipe);

  // Add the necessary stores and hooks for the dropdown menu
  const { open, recipeId, openDialog, closeDialog } = useAddToMenuDialogStore();
  const { handleSyncIngredients } = useSyncIngredients(user?.id || "");

  // Only reset image loaded state when image changes
  // useEffect(() => {
  //   setIsImageLoaded(false);
  // }, [image]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setIsSaving(true);

      if (!recipeImage || !recipe) return;

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
        imageUrl: recipeImage,
      });

      setSavedRecipeId(newRecipeId);
    } catch (error) {
      toast.error("Failed to save recipe");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    clearForm();
    if (onClear) {
      onClear();
    }
  };

  const handleDelete = async () => {
    if (!user || !savedRecipeId) return;

    try {
      await deleteRecipe({
        userId: user.id,
        id: savedRecipeId,
        dishType: recipe?.dishType || "",
      });

      handleClear(); // Clear the AI response after deletion
    } catch (error) {
      toast.error("Failed to delete recipe");
      console.error(error);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  if (recipe?.error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        <Card className="border-none bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 p-0">
          <CardContent className="p-6 flex items-center gap-6">
            <p className="text-muted-foreground">{recipe.error}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="border-none shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 pt-0">
          <motion.div
            className="relative"
            variants={imageContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {recipeImage && (
              <>
                <div className="relative w-full h-[400px] md:h-[500px]">
                  <Image
                    src={recipeImage || "/placeholder.svg"}
                    alt={recipe?.title || ""}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    onLoad={handleImageLoad}
                    quality={50}
                  />
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                ></motion.div>
              </>
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

              {savedRecipeId && (
                <DropdownMenu
                  modal={false}
                  open={dropdownOpen}
                  onOpenChange={setDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="gap-2">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        openDialog(savedRecipeId);
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Menu
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleSyncIngredients(savedRecipeId);
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Grocery List
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleDelete();
                        setDropdownOpen(false);
                      }}
                      className="text-destructive cursor-pointer"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Recipe
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.2 }}
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
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <AddToMenuDialog
        open={open}
        onOpenChange={closeDialog}
        recipeId={recipeId}
      />
    </>
  );
};

export default BubuAiResponse;
