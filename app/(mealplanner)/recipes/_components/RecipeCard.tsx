"use client";

import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { MoreVertical, ShoppingCart, Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RecipeImage } from "./RecipeImage";

interface RecipeCardProps {
  recipe: {
    _id: Id<"recipes">;
    title: string;
    readyInMinutes: number;
    servings: number;
    storageId?: Id<"_storage">;
    diets: string[];
    dishTypes: string[];
  };
  onDelete: (
    e: React.MouseEvent,
    recipeId: Id<"recipes">,
    title: string,
  ) => void;
  onSyncIngredients: (recipeId: Id<"recipes">) => void;
  dropdownOpen: boolean;
  onDropdownOpenChange: (open: boolean) => void;
}

export const RecipeCard = ({
  recipe,
  onDelete,
  onSyncIngredients,
  dropdownOpen,
  onDropdownOpenChange,
}: RecipeCardProps) => {
  return (
    <Link href={`/recipes/${recipe._id}`} className="relative group">
      <div className="absolute right-2 top-2 z-10">
        <DropdownMenu open={dropdownOpen} onOpenChange={onDropdownOpenChange}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="rounded-full bg-gray-300">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => onDelete(e, recipe._id, recipe.title)}
              className="text-destructive cursor-pointer"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete Recipe
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                onSyncIngredients(recipe._id);
                onDropdownOpenChange(false);
              }}
              className="cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Grocery List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card className="h-full hover:shadow-lg relative transition-shadow cursor-pointer pt-0">
        <div className="h-48">
          <RecipeImage recipe={recipe} />
        </div>
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
  );
};
