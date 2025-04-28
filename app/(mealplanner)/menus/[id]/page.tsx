"use client";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useSyncMenuIngredients } from "../_hooks/useSyncMenuIngredients";
import RecipeDetails from "../../recipes/_components/RecipeDetails";

const MenuPage = () => {
  const params = useParams();
  const { user } = useUser();
  const { handleSyncMenuIngredients } = useSyncMenuIngredients(user?.id || "");

  const menu = useQuery(api.menus.getMenu, {
    userId: user?.id || "",
    id: params.id as Id<"menus">,
  });

  if (!user) return null;

  if (menu === undefined) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (menu === null) {
    return <div className="text-center mt-8">Menu not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{menu.name}</h1>
        <Button
          onClick={() => handleSyncMenuIngredients(menu._id)}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          Add All Ingredients to Grocery List
        </Button>
      </div>
      <RecipeDetails menuId={menu._id} />
    </div>
  );
};

export default MenuPage;
