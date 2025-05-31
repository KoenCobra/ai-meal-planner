"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2Icon, WandSparkles, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  GenerateRecipeInput,
  generateRecipeSchema,
  RecipeInput,
} from "@/lib/validation";
import {
  analyzeImageForRecipeWithAbort,
  generateRecipeImageWithAbort,
  generateRecipeWithAbort,
} from "../client-actions";

interface BibiAiFormProps {
  onRecipeGenerated: (recipe: RecipeInput, image?: string) => void;
  onGenerationStart?: () => void;
  onClear?: () => void;
}

const BibiAiForm = ({
  onRecipeGenerated,
  onGenerationStart,
}: BibiAiFormProps) => {
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const recipeAbortControllerRef = useRef<AbortController | null>(null);
  const imageAbortControllerRef = useRef<AbortController | null>(null);

  const form = useForm<GenerateRecipeInput>({
    resolver: zodResolver(generateRecipeSchema),
    defaultValues: {
      description: "",
    },
  });

  // Watch the description field for changes
  const description = form.watch("description");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);
    }
  };

  const handleCancel = () => {
    if (recipeAbortControllerRef.current) {
      recipeAbortControllerRef.current.abort();
      recipeAbortControllerRef.current = null;
    }

    if (imageAbortControllerRef.current) {
      imageAbortControllerRef.current.abort();
      imageAbortControllerRef.current = null;
    }

    setIsGeneratingRecipe(false);
    setIsGeneratingImage(false);
  };

  const onSubmit = async (input: GenerateRecipeInput) => {
    try {
      if (onGenerationStart) {
        onGenerationStart();
      }

      setIsGeneratingRecipe(true);

      // Create abort controller for recipe generation
      recipeAbortControllerRef.current = new AbortController();

      let recipe;

      if (selectedImage) {
        recipe = await analyzeImageForRecipeWithAbort(
          selectedImage,
          input.description.trim() || undefined,
          recipeAbortControllerRef.current.signal,
        );
      } else {
        recipe = await generateRecipeWithAbort(
          input,
          recipeAbortControllerRef.current.signal,
        );
      }

      setIsGeneratingRecipe(false);

      onRecipeGenerated(recipe);

      setIsGeneratingImage(true);

      imageAbortControllerRef.current = new AbortController();

      const image = await generateRecipeImageWithAbort(
        recipe.title,
        recipe.summary,
        imageAbortControllerRef.current.signal,
      );

      if (image) {
        onRecipeGenerated(recipe, image);
      }
    } catch (error) {
      return console.log(error);
    } finally {
      setIsGeneratingRecipe(false);
      setIsGeneratingImage(false);
      recipeAbortControllerRef.current = null;
      imageAbortControllerRef.current = null;
    }
  };

  const isGenerating = isGeneratingRecipe || isGeneratingImage;

  return (
    <div className="md:w-1/2 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={
                        selectedImage
                          ? "Add any specific instructions for your food image (optional)"
                          : 'E.g. "I want a recipe for a healthy breakfast" (in any language you prefer)'
                      }
                      disabled={isGenerating}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                      rows={12}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center flex-wrap gap-2">
              <Input
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                disabled={isGenerating}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="w-full"
                disabled={isGenerating}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                {selectedImage ? selectedImage.name : "Upload a food image"}
              </Button>
              {selectedImage && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                  className="flex-shrink-0 mx-auto"
                  disabled={isGenerating}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button
              disabled={isGenerating || (!description.trim() && !selectedImage)}
              type="submit"
              className="mt-2"
            >
              {isGeneratingRecipe
                ? "Generating Recipe"
                : isGeneratingImage
                  ? "Generating Image"
                  : selectedImage
                    ? "Generate Recipe from Image"
                    : "Generate Recipe from Text"}
              {isGenerating ? (
                <Loader2Icon className="ml-2 animate-spin" />
              ) : (
                <WandSparkles className="ml-2" />
              )}
            </Button>

            {isGenerating && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="mt-2"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BibiAiForm;
