import { auth, clerkClient } from "@clerk/nextjs/server";

export const freeRecipeGenerationsLeft = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const user = await (await clerkClient()).users.getUser(userId);

  const freeRecipeGenerationsLeft =
    user.privateMetadata.free_recipe_generations_left;

  console.log(freeRecipeGenerationsLeft);

  return freeRecipeGenerationsLeft;
};
