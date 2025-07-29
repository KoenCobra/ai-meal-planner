import { auth, clerkClient } from "@clerk/nextjs/server";

export const freeRecipeGenerationsLeft = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await (await clerkClient()).users.getUser(userId);

  return Number(user.privateMetadata.free_recipe_generations_left);
};

export const updateFreeRecipeGenerationsLeft = async () => {
  "use server";

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const generationsLeft = await freeRecipeGenerationsLeft();

  if (generationsLeft === 0) {
    return 0;
  }

  const user = await (await clerkClient()).users.getUser(userId);

  if (user.privateMetadata.free_recipe_generations_left === undefined) {
    await (
      await clerkClient()
    ).users.updateUserMetadata(userId, {
      privateMetadata: {
        free_recipe_generations_left: 9,
      },
    });
  }

  await (
    await clerkClient()
  ).users.updateUserMetadata(userId, {
    privateMetadata: {
      free_recipe_generations_left: generationsLeft - 1,
    },
  });

  return generationsLeft - 1;
};

export const hasUserActiveSubscription = async () => {
  const { has, userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return has({ plan: "active_subscription" });
};
