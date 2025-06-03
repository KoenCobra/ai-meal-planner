"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { MoreVertical, Plus, ShoppingCart, Trash } from "lucide-react";
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

  return (
    <>
      <Link
        href={`/recipes/${recipe._id}?type=${currentTab}`}
        className="relative group"
      >
        <div
          className="absolute right-2 top-2 z-1"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <DropdownMenu
            modal={false}
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-full bg-gray-300">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  openDialog(recipe._id);
                  setDropdownOpen(false);
                }}
                className="cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Menu
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleSyncIngredients(recipe._id);
                  setDropdownOpen(false);
                }}
                className="cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Grocery List
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
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
        <Card className="h-full hover:shadow-lg relative transition-shadow cursor-pointer pt-0">
          <div className="aspect-square">
            <RecipeImage recipe={recipe} />
          </div>
          <CardHeader>
            <CardTitle>{recipe.title}</CardTitle>
            <CardDescription>
              {recipe.categories?.join(" • ") || "No specific category"}
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
              <span
                key={recipe.dishType}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs"
              >
                {recipe.dishType}
              </span>
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
