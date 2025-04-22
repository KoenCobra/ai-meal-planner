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
      company: {
        id: userId,
      },
      user: {
        id: userId,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching recipes: ${error}`);
  }
};

export const getRecipeById = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found in getRecipeById");
  }

  try {
    const res = await axiosInstance.get(
      `recipes/${id}/information?includeNutrition=true&addWinePairing=false&addTasteData=false`,
    );

    await client.track({
      event: "api-calls-to-spoonacular",
      company: {
        id: userId,
      },
      user: {
        id: userId,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(`Error fetching recipe by id: ${error}`);
  }
};
