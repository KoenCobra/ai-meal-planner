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
import { ImageIcon, Loader2Icon, WandSparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  GenerateRecipeInput,
  generateRecipeSchema,
  RecipeInput,
} from "@/lib/validation";
import {
  analyzeImageForRecipe,
  generateRecipe,
  generateRecipeImage,
} from "../actions";

interface BibiAiFormProps {
  onRecipeGenerated: (recipe: RecipeInput, image?: string) => void;
  onGenerationStart?: () => void;
}

const BibiAiForm = ({
  onRecipeGenerated,
  onGenerationStart,
}: BibiAiFormProps) => {
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  const onSubmit = async (input: GenerateRecipeInput) => {
    try {
      if (onGenerationStart) {
        onGenerationStart();
      }

      setIsGeneratingRecipe(true);

      let recipe: RecipeInput;

      if (selectedImage) {
        // If there's an image, use it along with any text instructions
        recipe = await analyzeImageForRecipe(
          selectedImage,
          input.description.trim() || undefined,
        );
      } else {
        // Text-only generation
        recipe = await generateRecipe(input);
      }

      // Pass the recipe to the parent component immediately
      onRecipeGenerated(recipe);

      // Then start generating the image
      setIsGeneratingImage(true);
      const image = await generateRecipeImage(recipe.title, recipe.summary);
      // Update with the image when it's ready
      if (image && image.imageBase64) {
        onRecipeGenerated(recipe, image.imageBase64);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error generating recipe:", error);
    } finally {
      setIsGeneratingRecipe(false);
      setIsGeneratingImage(false);
    }
  };

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
                      rows={4}
                      autoFocus
                      disabled={isGeneratingRecipe || isGeneratingImage}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
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
                disabled={isGeneratingRecipe || isGeneratingImage}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="w-full"
                disabled={isGeneratingRecipe || isGeneratingImage}
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
                  disabled={isGeneratingRecipe || isGeneratingImage}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              disabled={
                isGeneratingRecipe ||
                isGeneratingImage ||
                (!description.trim() && !selectedImage)
              }
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
              {isGeneratingRecipe || isGeneratingImage ? (
                <Loader2Icon className="ml-2 animate-spin" />
              ) : (
                <WandSparkles className="ml-2" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BibiAiForm;
