"use client";

import { convertToWebp } from "@/app/(mealplanner)/bibi-ai/actions";
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
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MAX_FILE_SIZE } from "@/lib/image-utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreVertical, Plus, ShoppingCart, Trash, Upload } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import AddToMenuDialog from "../../_components/AddToMenuDialog";
import { useAddToMenuDialogStore } from "../../_stores/useAddToMenuDialogStore";
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
  onDelete: (recipeId: Id<"recipes">, title: string) => void;
  onSyncIngredients: (recipeId: Id<"recipes">) => void;
}

export const RecipeCard = ({
  recipe,
  onDelete,
  onSyncIngredients,
}: RecipeCardProps) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { open, recipeId, openDialog, closeDialog } = useAddToMenuDialogStore();

  const { user } = useUser();
  const generateUploadUrl = useMutation(api.recipes.images.generateUploadUrl);
  const updateRecipeImage = useMutation(api.recipes.images.updateRecipeImage);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Convert to WebP
      const { imageBase64 } = await convertToWebp(base64);

      // Get the upload URL
      const postUrl = await generateUploadUrl({ userId: user.id });

      // Convert base64 to blob
      const response = await fetch(imageBase64);
      const blob = await response.blob();

      // Upload the file
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "image/webp" },
        body: blob,
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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Link href={`/recipes/${recipe._id}`} className="relative group">
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
                  onSyncIngredients(recipe._id);
                  setDropdownOpen(false);
                }}
                className="cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Grocery List
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  triggerFileInput();
                  setDropdownOpen(false);
                }}
                className="cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onDelete(recipe._id, recipe.title);
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

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />

      <AddToMenuDialog
        open={open}
        onOpenChange={closeDialog}
        recipeId={recipeId}
      />
    </>
  );
};
