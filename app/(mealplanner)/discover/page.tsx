import { Metadata } from "next";
import RecipeCarousel from "./_components/RecipeCarousel";
import RefreshRecipesButton from "./_components/RefreshRecipesButton";
import { client } from "@/lib/schematic";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Discover",
};

const Discover = async () => {
  //move to server action maybe?
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found in Discover page");
  }

  await client.track({
    event: "api-calls-to-spoonacular",
    company: {
      id: userId,
    },
    user: {
      id: userId,
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-center uppercase items-center gap-2">
        Discover Recipes
      </h1>
      <div className="mb-10 max-w-xl mx-auto text-center">
        <p className="text-muted-foreground mb-5">
          Add recipes to your menu by clicking the + button.
        </p>
        <RefreshRecipesButton />
      </div>
      <div className="flex flex-col gap-10">
        <RecipeCarousel dishType="breakfast" />
        <RecipeCarousel dishType="lunch" />
        <RecipeCarousel dishType="dinner" />
      </div>
    </>
  );
};

export default Discover;
