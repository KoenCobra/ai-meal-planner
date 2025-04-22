"use client";

import React from "react";
import Image from "next/image";

interface RecipeDetailProps {
  recipeId: string;
}

const RecipeDetailHeader = ({ recipeId }: RecipeDetailProps) => {
  return (
    <>
      <Image
        src={
          recipeId
            ? `https://img.spoonacular.com/recipes/${recipeId}-636x393.jpg`
            : "/images/image-placeholder.jpeg"
        }
        alt="image"
        width={1000}
        height={1000}
        className="rounded-md"
      />
    </>
  );
};

export default RecipeDetailHeader;
