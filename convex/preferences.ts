import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { rateLimiter } from "./rateLimiter";

export const getPreferences = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when getting preferences");
      throw new ConvexError("Unauthorized when getting preferences");
    }

    return await ctx.db
      .query("preferences")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
  },
});

export const updatePreferences = mutation({
  args: {
    diets: v.optional(v.array(v.string())),
    allergies: v.optional(v.array(v.string())),
    preferences: v.optional(v.array(v.string())),
    servings: v.optional(v.number()),
    readyInMinutes: v.optional(v.number()),
    additionalInstructions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject;
    if (!userId) {
      console.error("Unauthorized when updating preferences");
      throw new ConvexError("Unauthorized when updating preferences");
    }

    await rateLimiter.limit(ctx, "updatePreferences", {
      key: userId,
      throws: true,
    });

    const existingPreferences = await ctx.db
      .query("preferences")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existingPreferences) {
      await ctx.db.patch(existingPreferences._id, {
        diets: args.diets,
        allergies: args.allergies,
        preferences: args.preferences,
        servings: args.servings,
        readyInMinutes: args.readyInMinutes,
        additionalInstructions: args.additionalInstructions,
      });
    } else {
      await ctx.db.insert("preferences", {
        userId,
        diets: args.diets,
        allergies: args.allergies,
        preferences: args.preferences,
        servings: args.servings,
        readyInMinutes: args.readyInMinutes,
        additionalInstructions: args.additionalInstructions,
      });
    }
  },
});
