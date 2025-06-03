"use client";

import Image from "next/image";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImageIcon,
  Loader2Icon,
  SendHorizontal,
  Square,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  type GenerateRecipeInput,
  generateRecipeSchema,
  type RecipeInput,
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
  onImageGenerationAborted?: () => void;
}

const BibiAiForm = ({
  onRecipeGenerated,
  onGenerationStart,
  onImageGenerationAborted,
}: BibiAiFormProps) => {
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const recipeAbortControllerRef = useRef<AbortController | null>(null);
  const imageAbortControllerRef = useRef<AbortController | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<GenerateRecipeInput>({
    resolver: zodResolver(generateRecipeSchema),
    defaultValues: {
      description: "",
    },
  });

  const description = form.watch("description");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      // Notify parent that image generation was aborted
      if (onImageGenerationAborted) {
        onImageGenerationAborted();
      }
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

      // Clear the recipe abort controller since it's done
      recipeAbortControllerRef.current = null;
      setIsGeneratingRecipe(false);

      onRecipeGenerated(recipe);

      // Start image generation
      setIsGeneratingImage(true);

      // Create abort controller for image generation
      imageAbortControllerRef.current = new AbortController();

      const image = await generateRecipeImageWithAbort(
        recipe.title,
        recipe.summary,
        imageAbortControllerRef.current.signal,
      );

      // Clear the image abort controller since it's done
      imageAbortControllerRef.current = null;

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

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    form.setValue("description", textarea.value);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <div className="flex items-start">
              {selectedImage && imagePreview && (
                <div className="relative inline-block mb-4">
                  <div className="h-20 w-20 relative overflow-hidden rounded-sm">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Selected food"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    disabled={isGenerating}
                    className="size-5 p-0 text-zinc-100 hover:text-white absolute -top-1.5 -right-1.5 bg-black/70 backdrop-blur-sm rounded-full"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <textarea
                      {...field}
                      ref={textareaRef}
                      placeholder={
                        selectedImage
                          ? "Add any specific instructions for your food image (optional)"
                          : "Type your recipe description here..."
                      }
                      disabled={isGenerating}
                      onChange={handleTextareaChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                      className="flex-1 resize-none border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 min-h-[60px]overflow-y-auto w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center">
              <label htmlFor="image-upload" className="cursor-pointer">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  className="rounded-full"
                  disabled={isGenerating}
                >
                  <ImageIcon className="size" />
                </Button>
              </label>

              <Button
                disabled={
                  isGenerating || (!description.trim() && !selectedImage)
                }
                type="submit"
                size="icon"
                variant="ghost"
                className="rounded-full"
              >
                {isGenerating ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <SendHorizontal className="size-4" />
                )}
              </Button>

              {isGenerating ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <Square className="size-4" fill="currentColor" />
                </Button>
              ) : null}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.webp"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
            disabled={isGenerating}
          />
        </form>
      </Form>
    </div>
  );
};

export default BibiAiForm;
