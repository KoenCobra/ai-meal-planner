"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RecipeInput } from "@/lib/validation";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useGenerateImage } from "../_hooks/useGenerateImage";
import BubuAiForm from "./BubuAiForm";
import BubuAiResponse from "./BubuAiResponse";
import Header from "./Header";

const BibiAi = () => {
  const { data: recipe } = useQuery<RecipeInput>({
    queryKey: ["generate-recipe"],
  });

  const { generateImageMutation, abort: abortImage } = useGenerateImage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Header />
      <div className="max-w-3xl mx-auto g-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
        >
          <Card className="border-none  bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80 p-0 pt-4">
            <CardContent className="p-0 px-4">
              <BubuAiForm
                isGeneratingImage={generateImageMutation.isPending}
                generateImage={generateImageMutation.mutateAsync}
                abortImage={abortImage}
              />
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {recipe && (
            <motion.div
              key="recipe-response"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="mt-8 pb-6"
            >
              <BubuAiResponse
                isGeneratingImage={generateImageMutation.isPending}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BibiAi;
