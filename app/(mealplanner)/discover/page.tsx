import { Metadata } from "next";
import RecipeCarousel from "./_components/RecipeCarousel";
import RefreshRecipesButton from "./_components/RefreshRecipesButton";

export const metadata: Metadata = {
  title: "Discover",
};

const Discover = async () => {
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
