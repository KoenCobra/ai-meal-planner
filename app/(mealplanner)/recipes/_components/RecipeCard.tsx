"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import {
  Clock,
  MoreHorizontal,
  Plus,
  ShoppingCart,
  Trash,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import AddToMenuDialog from "../../_components/AddToMenuDialog";
import { useAddToMenuDialogStore } from "../../_stores/useAddToMenuDialogStore";
import { useSyncIngredients } from "../_hooks/useSyncIngredients";
import { RecipeImage } from "./RecipeImage";

interface RecipeCardProps {
  recipe: {
    _id: Id<"recipes">;
    title: string;
    readyInMinutes: number;
    servings: number;
    imageUrl: string;
    categories: string[];
    dishType: string;
  };
  onDelete: (recipeId: Id<"recipes">, title: string, dishType: string) => void;
}

export const RecipeCard = ({ recipe, onDelete }: RecipeCardProps) => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("type") || "breakfast";

  if (!user) throw new Error("User not found");

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { open, recipeId, openDialog, closeDialog } = useAddToMenuDialogStore();
  const { handleSyncIngredients } = useSyncIngredients(user.id);
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      <Link
        href={`/recipes/${recipe._id}?type=${currentTab}`}
        className="group block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={cn(
            "h-full overflow-hidden transition-all duration-300 border-none shadow-md pt-0",
            isHovered && "shadow-xl scale-[1.02]",
          )}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <RecipeImage recipe={recipe} />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300",
                isHovered && "opacity-100",
              )}
            />

            <div className="absolute top-3 right-3 z-10">
              <DropdownMenu
                modal={false}
                open={dropdownOpen}
                onOpenChange={setDropdownOpen}
              >
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className={cn(
                      "rounded-full h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm",
                      !isHovered && !dropdownOpen && "opacity-0",
                    )}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      openDialog(recipe._id);
                      setDropdownOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Menu
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSyncIngredients(recipe._id);
                      setDropdownOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Grocery List
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onDelete(recipe._id, recipe.title, recipe.dishType);
                    }}
                    className="text-destructive cursor-pointer"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Recipe
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <Badge
                variant="secondary"
                className={cn(
                  "bg-white/80 backdrop-blur-sm text-black transition-opacity duration-300",
                  !isHovered && "opacity-0",
                )}
              >
                {recipe.dishType}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-lg line-clamp-1 mb-1">
              {recipe.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
              {recipe.categories?.join(" • ") || "No specific category"}
            </p>
          </CardContent>

          <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span className="text-xs">{recipe.readyInMinutes} min</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="h-3 w-3 mr-1" />
              <span className="text-xs">{recipe.servings}</span>
            </div>
          </CardFooter>
        </Card>
      </Link>

      <AddToMenuDialog
        open={open}
        onOpenChange={closeDialog}
        recipeId={recipeId}
      />
    </>
  );
};
