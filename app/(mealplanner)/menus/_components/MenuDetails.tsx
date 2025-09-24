"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { RecipeGridSkeleton } from "../../_components/LoadingSkeletons";
import RecipeDetails from "../../recipes/_components/RecipeDetails";
import { useSyncMenuIngredients } from "../_hooks/useSyncMenuIngredients";

const MenuDetails = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { handleSyncMenuIngredients } = useSyncMenuIngredients();

  useEffect(() => {
    if (!searchParams.has("type")) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("type", "breakfast");
      window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
    }
  }, [searchParams]);

  const { data: menu, isLoading } = useQuery({
    ...convexQuery(api.menus.getMenu, {
      id: params.id as Id<"menus">,
    }),
  });

  if (isLoading) {
    return <RecipeGridSkeleton />;
  }

  if (!menu) {
    return <div>Menu not found</div>;
  }

  return (
    <div className="container mx-auto pb-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{menu.name}</h1>
        <Button
          onClick={() => handleSyncMenuIngredients(menu._id)}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          Add all ingredients to grocery list
        </Button>
      </div>
      <RecipeDetails menuId={menu._id} />
    </div>
  );
};

export default MenuDetails;
