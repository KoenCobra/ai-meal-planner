"use server";

import { auth } from "@clerk/nextjs/server";
import { axiosInstance } from "../utils/axiosInstance";
import { client } from "@/lib/schematic";

export const getRecipes = async (dishType: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found in getRecipes");
  }

  try {
    const res = await axiosInstance.get(
      `recipes/random?number=3&include-tags=${dishType}&includeNutrition=false`,
    );

    await client.track({
      event: "api-calls-to-spoonacular",
    });

    return res.data.recipes;
  } catch (error) {
    throw new Error(`Error fetching recipes: ${error}`);
  }
};
