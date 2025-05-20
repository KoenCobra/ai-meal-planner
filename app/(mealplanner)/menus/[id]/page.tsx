"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import RecipeDetails from "../../recipes/_components/RecipeDetails";
import { useSyncMenuIngredients } from "../_hooks/useSyncMenuIngredients";

const MenuPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { handleSyncMenuIngredients } = useSyncMenuIngredients(user?.id || "");

  // Set default tab if not specified
  useEffect(() => {
    if (!searchParams.has("type")) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("type", "breakfast");
      window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
    }
  }, [searchParams]);

  const { data: menu } = useQuery({
    ...convexQuery(api.menus.getMenu, {
      userId: user?.id || "",
      id: params.id as Id<"menus">,
    }),
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
