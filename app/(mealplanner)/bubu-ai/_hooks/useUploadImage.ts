import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

export const useUploadImage = () => {
  const generateUploadUrl = useMutation(api.recipes.generateUploadUrl);

  const uploadImage = async (
    imageUrl: string,
  ): Promise<Id<"_storage"> | undefined> => {
    if (!imageUrl.startsWith("data:")) {
      return undefined;
    }

    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const uploadUrl = await generateUploadUrl();

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": blob.type },
      body: blob,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image");
    }

    const { storageId } = await uploadResponse.json();
    return storageId as Id<"_storage">;
  };

  return {
    uploadImage,
  };
};
