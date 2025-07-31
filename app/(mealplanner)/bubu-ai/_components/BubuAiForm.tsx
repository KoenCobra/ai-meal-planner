"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  SlidersHorizontal,
  Square,
  UnlockIcon,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { sanitizeHtml } from "@/lib/utils";
import {
  type GenerateRecipeInput,
  generateRecipeSchema,
} from "@/lib/validation";
import { useUser } from "@clerk/nextjs";
import { track } from "@vercel/analytics";
import { redirect } from "next/navigation";
import { useAnalyzeImage } from "../_hooks/useAnylizeImage";
import { useGenerateNutritionalValues } from "../_hooks/useGenerateNutritionalValues";
import { useGenerateRecipe } from "../_hooks/useGenerateRecipe";
import { useBubuAi } from "../BubuAiContext";
import { useClearAiCache } from "../utils/clearAiCache";
import Preferences from "./Preferences";

interface BubuAiFormProps {
  isGeneratingImage: boolean;
  generateImage: (params: {
    recipeTitle: string;
    recipeSummary: string;
  }) => Promise<{ imageUrl: string }>;
  abortImage: () => void;
  generationsLeft: number;
  updateFreeRecipeGenerationsLeft: () => Promise<number>;
  hasActiveSubscription: boolean;
}

const BubuAiForm = ({
  isGeneratingImage,
  generateImage,
  abortImage,
  generationsLeft,
  updateFreeRecipeGenerationsLeft,
  hasActiveSubscription,
}: BubuAiFormProps) => {
  const { user } = useUser();

  const {
    description,
    setDescription,
    selectedImage,
    setSelectedImage,
    imagePreview,
    setImagePreview,
    setSavedRecipeId,
  } = useBubuAi();

  const [showPreferences, setShowPreferences] = useState(false);
  const [recipeGenerationsLeft, setRecipeGenerationsLeft] =
    useState(generationsLeft);

  const { generateRecipeMutation, abort } = useGenerateRecipe();
  const { analyzeImageMutation, abort: abortAnalyzeImage } = useAnalyzeImage();
  const {
    generateNutritionalValues,
    isGeneratingNutritionalValues,
    abort: abortNutritionalValues,
  } = useGenerateNutritionalValues();
  const { clearAiCache } = useClearAiCache();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<GenerateRecipeInput>({
    resolver: zodResolver(generateRecipeSchema),
    values: {
      description: description,
    },
  });

  const isProcessing =
    generateRecipeMutation.isPending ||
    isGeneratingImage ||
    analyzeImageMutation.isPending ||
    isGeneratingNutritionalValues;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);

      // Clear textarea when new image is uploaded
      form.setValue("description", "");
      setDescription("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (input: GenerateRecipeInput) => {
    if (recipeGenerationsLeft === 0 && !hasActiveSubscription) {
      return toast.error("You have no free recipes left");
    }

    clearAiCache();
    setSavedRecipeId(null);

    try {
      let recipe;

      if (selectedImage) {
        recipe = await analyzeImageMutation.mutateAsync({
          image: selectedImage,
          additionalInstructions: input.description,
        });

        track("BubuAiForm submit", {
          user: user?.emailAddresses[0].emailAddress ?? "anonymous",
          description: sanitizeHtml(input.description),
          image: true,
        });
      } else {
        recipe = await generateRecipeMutation.mutateAsync(input);

        track("BubuAiForm submit", {
          user: user?.emailAddresses[0].emailAddress ?? "anonymous",
          description: sanitizeHtml(input.description),
        });
      }

      if (!recipe.error) {
        generateImage({
          recipeTitle: recipe.title,
          recipeSummary: recipe.summary,
        });

        generateNutritionalValues(recipe.ingredients, recipe.servings);

        const newGenerationsLeft = await updateFreeRecipeGenerationsLeft();
        setRecipeGenerationsLeft(newGenerationsLeft);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Recipe generation was aborted");
      } else {
        toast.error("Failed to generate recipe");
      }
    }
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    const value = textarea.value;
    form.setValue("description", value);
    setDescription(value);
  };

  const clearTextarea = () => {
    form.setValue("description", "");
    setDescription("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  return (
    <>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <div className="flex items-start">
                {selectedImage && imagePreview && (
                  <div className="relative inline-block mb-4">
                    <div className="h-20 w-20 relative overflow-hidden rounded-sm">
                      <Image
                        src={imagePreview}
                        alt="Selected food"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        unoptimized
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
                      disabled={isProcessing}
                      className="size-5 p-0 text-zinc-100 hover:text-white absolute -top-1.5 -right-1.5 bg-black/70 hover:bg-black/80 backdrop-blur-sm rounded-full"
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
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative"
                      >
                        <textarea
                          {...field}
                          ref={textareaRef}
                          placeholder={
                            selectedImage
                              ? "Add any specific instructions for your food image (optional)"
                              : `Type your recipe description here (in your preferred language)...`
                          }
                          disabled={
                            isProcessing ||
                            (!hasActiveSubscription &&
                              recipeGenerationsLeft === 0)
                          }
                          onChange={handleTextareaChange}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              form.handleSubmit(onSubmit)();
                            }
                          }}
                          className="flex-1 resize-none border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 min-h-[60px] overflow-y-auto w-full pr-8"
                        />

                        <AnimatePresence>
                          {description.trim() && !isProcessing && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                              }}
                              className="absolute -top-1 -right-1"
                            >
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={clearTextarea}
                                className="size-6 p-0 text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-400 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              >
                                <X className="size-4" />
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full"
                    disabled={
                      isProcessing ||
                      (!hasActiveSubscription && recipeGenerationsLeft === 0)
                    }
                    onClick={() => {
                      setShowPreferences(true);
                    }}
                  >
                    <SlidersHorizontal className="size-4" />
                  </Button>
                </motion.div>

                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                    className="rounded-full"
                    disabled={
                      isProcessing ||
                      (!hasActiveSubscription && recipeGenerationsLeft === 0)
                    }
                  >
                    <ImageIcon className="size-4" />
                  </Button>
                </motion.div>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Button
                    disabled={
                      isProcessing || (!description.trim() && !selectedImage)
                    }
                    type="submit"
                    variant="ghost"
                    className="rounded-full size-8"
                  >
                    {isProcessing ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                      <SendHorizontal className="size-4" />
                    )}
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {isProcessing && (
                    <motion.div
                      key="cancel-button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          abort();
                          abortAnalyzeImage();
                          abortImage();
                          abortNutritionalValues();
                        }}
                        className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Square className="size-4" fill="currentColor" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!hasActiveSubscription && recipeGenerationsLeft > 0 && (
                  <p className="text-xs font-medium text-muted-foreground italic ml-auto bg-muted rounded-full px-2 py-1">
                    {recipeGenerationsLeft} free recipes left
                  </p>
                )}
                {!hasActiveSubscription && recipeGenerationsLeft === 0 && (
                  <Button
                    variant="ghost"
                    className="rounded-full ml-auto"
                    type="button"
                    onClick={() => {
                      redirect("/billing");
                    }}
                  >
                    <UnlockIcon className="size-4" />
                    <span className="text-xs">Unlock more recipes</span>
                  </Button>
                )}
              </motion.div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              disabled={isProcessing}
            />
          </form>
        </Form>
      </motion.div>

      <Preferences
        showPreferences={showPreferences}
        setShowPreferences={setShowPreferences}
      />
    </>
  );
};

export default BubuAiForm;
