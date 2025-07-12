import { ConvexError } from "convex/values";
import { query } from "./_generated/server";

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
