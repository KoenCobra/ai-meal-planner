import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { RecipeInput } from "@/lib/validation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { Loader2, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface BubuAiResponseProps {
  recipe: RecipeInput;
  image: string;
  onClear?: () => void;
}

const AiResponse = ({ recipe, image, onClear }: BubuAiResponseProps) => {
  const { user } = useUser();
  const [savedRecipeId, setSavedRecipeId] =
    React.useState<Id<"recipes"> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isImageGenerating, setIsImageGenerating] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const createRecipe = useMutation(api.recipes.createRecipe);

  // Create a simple blur data URL
  const createBlurDataURL = () => {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZjNmNGY2O3N0b3Atb3BhY2l0eToxIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlNWU3ZWI7c3RvcC1vcGFjaXR5OjEiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgLz4KPHN2Zz4K";
  };

  // Reset state when recipe changes
  useEffect(() => {
    setSavedRecipeId(null);
    setIsImageGenerating(!image);
    setIsImageLoaded(false);
  }, [recipe, image]);

  if (recipe?.error) {
    toast.error(recipe.error);
  }

  const handleSave = async () => {
    if (!user) return;

    try {
      setIsSaving(true);

      let imageUrl = null;

      // Generate image URL if we have an image
      if (image) {
        try {
          // Use the existing image URL directly
          imageUrl = image;
        } catch (error) {
          console.error("Error with image:", error);
          // Continue with recipe creation even if there's an image issue
        }
      }

      // Create the recipe in the database
      const newRecipeId = await createRecipe({
        userId: user.id,
        title: recipe.title,
        summary: recipe.summary,
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        diets: recipe.diets,
        instructions: {
          steps: recipe.instructions.steps,
        },
        ingredients: recipe.ingredients,
        dishType: recipe.dishType,
        imageUrl: imageUrl || undefined, // Add the image URL directly
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
      toast.success("Recipe cleared");
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      <div className="text-center mt-16">
        <div className="relative w-full max-w-2xl mx-auto aspect-square mb-6">
          {image ? (
            <>
              <Image
                src={image}
                alt={recipe.title}
                className="rounded-lg shadow-lg object-cover w-full h-full"
                width={1024}
                height={1024}
                placeholder="blur"
                blurDataURL={createBlurDataURL()}
                priority
                onLoad={handleImageLoad}
              />
              {!isImageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted rounded-lg">
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
                  <p className="text-xs text-muted-foreground mt-1">
                    This may take a moment
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-muted rounded-lg">
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
                Generating image...
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This may take a moment
              </p>
            </div>
          )}
        </div>

        <h1 className="text-4xl font-bold">{recipe?.title?.toUpperCase()}</h1>
        <p className="text-muted-foreground mb-2 text-sm">
          ({recipe?.diets?.join(" • ")})
        </p>

        <div className="flex justify-center items-center gap-3">
          <Button
            variant="outline"
            className="mt-4 text-xl p-7"
            onClick={handleSave}
            disabled={!!savedRecipeId || isSaving || isImageGenerating}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Recipe
              </>
            ) : isImageGenerating ? (
              <>Waiting for image...</>
            ) : savedRecipeId ? (
              <>
                Recipe Saved
                <Save className="ml-2" size={14} />
              </>
            ) : (
              <>
                Save Recipe
                <Save className="ml-2" size={14} />
              </>
            )}
          </Button>

          {onClear && (
            <Button
              variant="ghost"
              className="mt-4"
              onClick={handleClear}
              title="Clear saved recipe"
              disabled={isSaving || isImageGenerating}
            >
              <Trash2 size={18} />
            </Button>
          )}
        </div>

        <div className="border-b border-t border-border mt-6 py-3">
          <p className="text-muted-foreground max-w-xl mx-auto">
            {recipe?.summary}
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-6 mt-10 gap-8 lg:gap-16">
        <div className="lg:col-span-2">
          <p className="font-bold text-xl">Ingredients</p>
          <p className="text-muted-foreground mb-6">
            {recipe?.servings} servings | {recipe?.readyInMinutes} minutes
          </p>
          {recipe?.ingredients?.map((ingredient) => (
            <div key={ingredient.name} className="gap-5 mb-6">
              <p>
                {ingredient.name?.charAt(0).toUpperCase() +
                  ingredient.name?.slice(1)}
              </p>
              <p className="text-muted-foreground">
                {ingredient.measures?.amount === 0
                  ? "to taste"
                  : `${ingredient.measures?.amount} ${ingredient.measures?.unit || ""}`}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <p className="font-bold text-xl mb-6">Instructions</p>
          {recipe?.instructions?.steps?.map((step, index) => (
            <div key={step.number} className="mb-2 flex gap-2">
              <span className="text-right">{index + 1}.</span>
              <p className="mb-4">{step.step}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AiResponse;
