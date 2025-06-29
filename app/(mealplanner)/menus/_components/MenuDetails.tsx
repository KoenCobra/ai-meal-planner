"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
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
    return (
      <div className="container mx-auto py-8 animate-in fade-in duration-500">
        <div className="text-center mb-8 space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-12 w-80 mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="border-0 rounded-lg overflow-hidden">
              <Skeleton className="w-full aspect-video" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
