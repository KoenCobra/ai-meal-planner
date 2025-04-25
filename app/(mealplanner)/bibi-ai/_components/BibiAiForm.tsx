"use client";

import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  GenerateRecipeInput,
  generateRecipeSchema,
  RecipeInput,
} from "@/lib/validation";
import { Loader2Icon, WandSparkles } from "lucide-react";
import { generateRecipe } from "../actions";

interface BibiAiFormProps {
  onRecipeGenerated: (recipe: RecipeInput) => void;
}

const BibiAiForm = ({ onRecipeGenerated }: BibiAiFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<GenerateRecipeInput>({
    resolver: zodResolver(generateRecipeSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (input: GenerateRecipeInput) => {
    try {
      setIsLoading(true);
      const recipe = await generateRecipe(input);
      onRecipeGenerated(recipe);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button disabled={isLoading} type="submit" className="mt-2">
              Generate Recipe
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <WandSparkles />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BibiAiForm;
