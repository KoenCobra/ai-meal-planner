import { ConvexError, v } from "convex/values";
import openai from "../../lib/openai";
import { api } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import {
  action,
  ActionCtx,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "../_generated/server";

// Helper function to decode base64
function base64ToUint8Array(base64: string): Uint8Array {
  const base64Data = base64.split(",")[1] || base64;
  const binString = atob(base64Data);
  return new Uint8Array(binString.split("").map((char) => char.charCodeAt(0)));
}

export const generateUploadUrl = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx: MutationCtx) => {
    // Validate user exists (optional but good practice)
    return await ctx.storage.generateUploadUrl();
  },
});

export const getImageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx: QueryCtx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const updateRecipeImage = mutation({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx: MutationCtx, args) => {
    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) {
      throw new ConvexError("Recipe not found");
    }
    if (recipe.userId !== args.userId) {
      throw new ConvexError("Not authorized");
    }

    // If there's an existing image, delete it
    if (recipe.storageId) {
      await ctx.storage.delete(recipe.storageId);
    }

    // Update the recipe with the new storage ID
    await ctx.db.patch(args.recipeId, {
      storageId: args.storageId,
    });

    return args.storageId;
  },
});

// New action for handling image upload for a newly generated recipe
export const uploadGeneratedImage = action({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
    imageBlob: v.string(), // Base64 encoded image data
  },
  handler: async (ctx: ActionCtx, args): Promise<Id<"_storage">> => {
    try {
      // Convert base64 to Uint8Array
      const binaryData = base64ToUint8Array(args.imageBlob);

      // Generate upload URL
      const postUrl: string = await ctx.runMutation(
        api.recipes.images.generateUploadUrl,
        {
          userId: args.userId,
        },
      );

      // Upload the file
      const result: Response = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "image/png" },
        body: binaryData,
      });

      if (!result.ok) {
        throw new Error("Failed to upload image");
      }

      const { storageId }: { storageId: Id<"_storage"> } = await result.json();

      // Update the recipe with the new storage ID
      await ctx.runMutation(api.recipes.images.updateRecipeImage, {
        userId: args.userId,
        recipeId: args.recipeId,
        storageId,
      });

      return storageId;
    } catch (error) {
      throw new Error("Failed to upload image: " + error);
    }
  },
});

// New action for generating recipe images with OpenAI
export const generateRecipeImage = action({
  args: {
    userId: v.string(),
    recipeId: v.id("recipes"),
    recipeTitle: v.string(),
    recipeDescription: v.string(),
  },
  handler: async (ctx: ActionCtx, args): Promise<Id<"_storage">> => {
    try {
      // Initialize OpenAI client

      // Generate image with OpenAI
      const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt: `Professional food photography of ${args.recipeTitle}. ${args.recipeDescription}. Top-down view, beautiful plating, restaurant quality, soft natural lighting.`,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "b64_json",
      });

      const imageData = response.data?.[0]?.b64_json;
      if (!imageData) {
        throw new Error("No image generated");
      }

      // Convert base64 to Uint8Array
      const binaryData = base64ToUint8Array(imageData);

      // Generate upload URL
      const postUrl = await ctx.runMutation(
        api.recipes.images.generateUploadUrl,
        {
          userId: args.userId,
        },
      );

      // Upload the file
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "image/png" },
        body: binaryData,
      });

      if (!result.ok) {
        throw new Error("Failed to upload image");
      }

      const { storageId } = await result.json();

      // Update the recipe with the new storage ID
      await ctx.runMutation(api.recipes.images.updateRecipeImage, {
        userId: args.userId,
        recipeId: args.recipeId,
        storageId,
      });

      return storageId;
    } catch (error) {
      console.error("Failed to generate or upload image:", error);
      throw new Error("Failed to generate or upload image: " + error);
    }
  },
});
