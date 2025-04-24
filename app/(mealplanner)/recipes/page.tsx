"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const RecipesPage = () => {
  const { user } = useUser();
  const recipes = useQuery(api.recipes.getAllRecipes, {
    userId: user?.id || "",
  });

  if (!user) return null;

  if (recipes === undefined) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link key={recipe._id} href={`/recipes/${recipe._id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer pt-0">
              {recipe.image ? (
                <div className="relative w-full h-48">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              ) : (
                <div className="relative w-full h-48">
                  <Image
                    src="/images/image-placeholder.jpeg"
                    alt="image"
                    fill
                    className="rounded-md"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>
                  {recipe.diets?.join(" • ") || "No specific diet"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ready in {recipe.readyInMinutes} minutes • {recipe.servings}{" "}
                  servings
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {recipe.dishTypes?.map((type) => (
                    <span
                      key={type}
                      className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
