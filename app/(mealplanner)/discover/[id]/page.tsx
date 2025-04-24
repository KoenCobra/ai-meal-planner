"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Printer } from "lucide-react";
import { useRecipe } from "../hooks";
import RecipeDetailHeader from "../_components/RecipeDetailHeader";
import RecipeDetailInstructions from "../_components/RecipeDetailInstructions";

const RecipeDetails = () => {
  const params = useParams();

  const { data, isError, isLoading } = useRecipe(params.id as string);

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && isError) return <div>Recipe not found</div>;

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold">{data?.title.toUpperCase()}</h1>
        <p className="text-muted-foreground mb-2">{data?.diets?.join(" • ")}</p>
        <div className="text-center border-t border-border">
          <h2 className="text-xl text-muted-foreground mt-5">
            Print or share this recipe
          </h2>
          <div className="flex justify-center gap-6 color-muted-foreground py-5">
            <Printer className="size-5 cursor-pointer text-muted-foreground " />
            <Image
              className="cursor-pointer"
              src="/facebook.svg"
              alt="facebook"
              width={18}
              height={18}
            />
            <Image
              className="cursor-pointer"
              src="/instagram.svg"
              alt="facebook"
              width={18}
              height={18}
            />
            <Image
              className="cursor-pointer"
              src="/x.svg"
              alt="facebook"
              width={18}
              height={18}
            />
            <Image
              className="cursor-pointer"
              src="/pinterest.svg"
              alt="facebook"
              width={18}
              height={18}
            />
          </div>
        </div>
        <Button variant="outline" className="mt-4 mb-6 text-2xl p-7">
          ADD +
        </Button>
      </div>
      <Tabs defaultValue="recipe">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="recipe">RECIPE</TabsTrigger>
          <TabsTrigger value="nutrition">NUTRITION</TabsTrigger>
        </TabsList>
        <TabsContent value="recipe">
          <RecipeDetailHeader recipeId={params.id as string} />

          <RecipeDetailInstructions />
        </TabsContent>
        <TabsContent value="nutrition"></TabsContent>
      </Tabs>
    </>
  );
};

export default RecipeDetails;
