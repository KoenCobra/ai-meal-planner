"use client";

import { convertToWebp } from "@/app/(mealplanner)/bibi-ai/actions";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MAX_FILE_SIZE } from "@/lib/image-utils";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface RecipeImageProps {
  recipe: {
    _id: Id<"recipes">;
    title: string;
    storageId?: Id<"_storage">;
  };
  className?: string;
}

export const RecipeImage = ({ recipe, className }: RecipeImageProps) => {
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.recipes.images.generateUploadUrl);
  const updateRecipeImage = useMutation(api.recipes.images.updateRecipeImage);
  const imageUrl = useQuery(
    api.recipes.images.getImageUrl,
    recipe.storageId ? { storageId: recipe.storageId } : "skip",
  );

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

  return (
    <div
      className={cn("relative w-full h-full", className)}
      onClick={(e) => e.stopPropagation()}
    >
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
