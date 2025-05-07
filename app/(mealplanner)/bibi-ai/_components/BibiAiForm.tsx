"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  GenerateRecipeInput,
  generateRecipeSchema,
  RecipeInput,
} from "@/lib/validation";
import { Loader2Icon, WandSparkles } from "lucide-react";
import { generateRecipe, generateRecipeImage } from "../actions";

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

  const form = useForm<GenerateRecipeInput>({
    resolver: zodResolver(generateRecipeSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (input: GenerateRecipeInput) => {
    try {
      // Notify parent to clear previous recipe and image
      if (onGenerationStart) {
        onGenerationStart();
      }

      setIsGeneratingRecipe(true);

      // First generate the recipe
      const recipe = await generateRecipe(input);

      // Pass the recipe to the parent component immediately
      onRecipeGenerated(recipe);

      // Then start generating the image
      setIsGeneratingImage(true);
      const image = await generateRecipeImage(recipe.title, recipe.summary);
      // Update with the image when it's ready
      if (image && image.imageBase64) {
        onRecipeGenerated(recipe, image.imageBase64);
      }
      setIsGeneratingImage(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error generating recipe:", error);
    } finally {
      setIsGeneratingRecipe(false);
    }
  };

  const buttonText = isGeneratingRecipe
    ? "Generating Recipe"
    : isGeneratingImage
      ? "Generating Image"
      : "Generate Recipe";

  return (
    <div className="md:w-1/2 mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={`E.g. "I want a recipe for a healthy breakfast" (in any language you prefer)`}
                    rows={4}
                    autoFocus
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
          <div className="flex justify-center">
            <Button
              disabled={isGeneratingRecipe || isGeneratingImage}
              type="submit"
              className="mt-2"
            >
              {buttonText}
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
