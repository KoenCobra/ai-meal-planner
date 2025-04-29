"use client";

import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import Image from "next/image";
import { Camera, MoreVertical, ShoppingCart, Trash } from "lucide-react";
import { toast } from "sonner";
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

const RecipeImage = ({ recipe }: { recipe: RecipeCardProps["recipe"] }) => {
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.recipes.images.generateUploadUrl);
  const updateRecipeImage = useMutation(api.recipes.images.updateRecipeImage);
  const imageUrl = useQuery(
    api.recipes.images.getImageUrl,
    recipe.storageId ? { storageId: recipe.storageId } : "skip",
  );

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    try {
      // Get the upload URL
      const postUrl = await generateUploadUrl({ userId: user.id });

      // Upload the file
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error("Failed to upload image");
      }

      const { storageId } = await result.json();

      // Update the recipe with the new storage ID
      await updateRecipeImage({
        userId: user.id,
        recipeId: recipe._id,
        storageId,
      });

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="relative w-full h-48" onClick={(e) => e.stopPropagation()}>
      {imageUrl ? (
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={recipe.title}
            fill
            className="object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <label className="cursor-pointer p-3 rounded-full bg-white/80 hover:bg-white transition-all transform hover:scale-110 shadow-sm">
              <Camera className="h-5 w-5 text-gray-700" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center bg-gray-100 rounded-t-lg relative group"
          onClick={(e) => e.stopPropagation()}
        >
          <label
            className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Camera className="h-8 w-8 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              onClick={(e) => e.stopPropagation()}
            />
          </label>
        </div>
      )}
    </div>
  );
};

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
        <RecipeImage recipe={recipe} />
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
