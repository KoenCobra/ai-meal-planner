"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";

const MenuOverviewPage = () => {
  const { user } = useUser();
  const params = useParams();
  const menuId = params?.id as Id<"menus"> | undefined;

  // Fetch menu details
  const menu = useQuery(
    api.menus.getMenu,
    user && menuId ? { userId: user.id, id: menuId } : "skip",
  );
  // Fetch recipes in the menu
  const recipes = useQuery(
    api.menus.getMenuRecipes,
    user && menuId ? { userId: user.id, menuId } : "skip",
  );

  if (!user) return null;
  if (!menu) return <div className="p-8">Loading menu...</div>;
  if (!recipes) return <div className="p-8">Loading recipes...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">{menu.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Recipes in this menu:</h2>
      {recipes.length === 0 ? (
        <div className="text-muted-foreground">
          No recipes in this menu yet.
        </div>
      ) : (
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <Link
              key={recipe._id}
              href={`/discover/${recipe._id}`}
              className="block hover:opacity-75 transition-opacity"
            >
              <div className="border rounded-md p-4 flex gap-4 items-center bg-card">
                {recipe.image && (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    className="object-cover rounded-md border"
                    width={80}
                    height={80}
                  />
                )}
                <div>
                  <div className="text-lg font-semibold">{recipe.title}</div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {recipe.summary}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Servings: {recipe.servings} | Ready in{" "}
                    {recipe.readyInMinutes} min
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuOverviewPage;
