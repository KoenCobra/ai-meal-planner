"use client";

import React from "react";
import { RecipeInput } from "@/lib/validation";
import { useQuery } from "@tanstack/react-query";
import BibiAiForm from "./_components/BibiAiForm";
import BibiAiResponse from "./_components/BibiAiResponse";

const BibiAi = () => {
  const { data } = useQuery<RecipeInput | null>({
    queryKey: ["ai-recipe"],
    queryFn: () => null,
  });

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">Ask Bibi</h1>
        <p className="text-muted-foreground mb-2">
          Generate recipes with Bibi AI.
        </p>
      </div>
      <BibiAiForm />

      {data && <BibiAiResponse recipe={data} />}
    </>
  );
};

export default BibiAi;
