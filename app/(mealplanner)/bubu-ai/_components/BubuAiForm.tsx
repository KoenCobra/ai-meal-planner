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
  analyzeImageForRecipe,
  generateRecipe,
  generateRecipeImage,
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

  const recipeControllerRef = useRef<AbortController | null>(null);
  const imageControllerRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    if (recipeControllerRef.current) {
      recipeControllerRef.current.abort();
      recipeControllerRef.current = null;
    }

    if (imageControllerRef.current) {
      imageControllerRef.current.abort();
      imageControllerRef.current = null;
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

      let recipe;

      if (selectedImage) {
        const { response, controller } = analyzeImageForRecipe(
          selectedImage,
          input.description.trim() || undefined,
        );
        recipeControllerRef.current = controller;
        recipe = await response;
      } else {
        const { response, controller } = generateRecipe(input);
        recipeControllerRef.current = controller;
        recipe = await response;
      }

      setIsGeneratingRecipe(false);
      recipeControllerRef.current = null;

      onRecipeGenerated(recipe);

      setIsGeneratingImage(true);

      const { response: imageResponse, controller: imageController } =
        generateRecipeImage(recipe.title, recipe.summary);
      imageControllerRef.current = imageController;

      const image = await imageResponse;

      if (image) {
        onRecipeGenerated(recipe, image);
      }
    } catch (error) {
      return console.log(error);
    } finally {
      setIsGeneratingRecipe(false);
      setIsGeneratingImage(false);
      recipeControllerRef.current = null;
      imageControllerRef.current = null;
      form.reset();
      setSelectedImage(null);
      setImagePreview(null);
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
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-2">
                {selectedImage && imagePreview && (
                  <div className="relative inline-block">
                    <div className="flex items-center gap-3 p-2 rounded-md bg-zinc-900 dark:bg-zinc-800 text-white max-w-xs">
                      <div className="h-10 w-10 relative overflow-hidden rounded-sm flex-shrink-0">
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Selected food"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{selectedImage.name}</p>
                        <p className="text-xs text-zinc-400">
                          {(selectedImage.size / 1024).toFixed(2)}kB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                        }}
                        disabled={isGenerating}
                        className="h-6 w-6 p-0 text-zinc-400 hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-end gap-3">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormControl>
                        <div className="relative flex items-end rounded-xl border bg-background focus-within:ring-1 focus-within:ring-ring">
                          <textarea
                            {...field}
                            ref={textareaRef}
                            placeholder={
                              selectedImage
                                ? "Add any specific instructions for your food image (optional)"
                                : 'E.g. "I want a recipe for a healthy breakfast" (in any language you prefer)'
                            }
                            disabled={isGenerating}
                            onChange={handleTextareaChange}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                form.handleSubmit(onSubmit)();
                              }
                            }}
                            className="flex-1 resize-none border-0 bg-transparent p-3 pr-12 focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 min-h-[80px] max-h-[200px] overflow-y-auto"
                            rows={1}
                          />

                          <div className="flex items-center p-3">
                            <label
                              htmlFor="image-upload"
                              className="cursor-pointer"
                            >
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  document
                                    .getElementById("image-upload")
                                    ?.click()
                                }
                                className="rounded-full"
                                disabled={isGenerating}
                              >
                                <ImageIcon className="size" />
                              </Button>
                            </label>

                            <Button
                              disabled={
                                isGenerating ||
                                (!description.trim() && !selectedImage)
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
                                <Square
                                  className="size-4"
                                  fill="currentColor"
                                />
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <input
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
