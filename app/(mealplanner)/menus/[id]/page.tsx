"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import RecipeDetails from "../../recipes/_components/RecipeDetails";

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
      <RecipeDetails />
    </div>
  );
};

export default MenuOverviewPage;
