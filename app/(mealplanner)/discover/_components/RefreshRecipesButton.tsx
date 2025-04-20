"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const RefreshRecipesButton = () => {
  const queryClient = useQueryClient();
  const refreshRecipes = () => {
    queryClient.invalidateQueries({ queryKey: ["discover"] });
  };
  return (
    <>
      <Button variant="outline" onClick={refreshRecipes}>
        <RefreshCcw className="size-4 mr-2" />
        Refresh
      </Button>
    </>
  );
};

export default RefreshRecipesButton;
