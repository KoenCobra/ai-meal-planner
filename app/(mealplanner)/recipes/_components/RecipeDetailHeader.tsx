"use client";

import React from "react";
import Image from "next/image";

const RecipeDetailHeader = () => {
  return (
    <Image
      src="/images/image-placeholder.jpeg"
      alt="image"
      width={1000}
      height={1000}
      className="rounded-md"
    />
  );
};

export default RecipeDetailHeader;
