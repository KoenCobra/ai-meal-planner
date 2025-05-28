import { convertToWebp } from "@/app/(mealplanner)/bibi-ai/actions";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { useMutation } from "convex/react";
import { useRef } from "react";
import { toast } from "sonner";

export const useImageUpload = (recipeId: Id<"recipes">, userId: string) => {
  const generateUploadUrl = useMutation(api.recipes.images.generateUploadUrl);
  const updateRecipeImage = useMutation(api.recipes.images.updateRecipeImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      const postUrl = await generateUploadUrl({ userId });

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
        userId,
        recipeId,
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

  return {
    handleImageUpload,
    triggerFileInput,
    fileInputRef,
  };
};
