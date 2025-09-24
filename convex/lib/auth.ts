import { ConvexError } from "convex/values";
import { MutationCtx, QueryCtx } from "../_generated/server";

/**
 * Get the authenticated user ID from the context
 * Throws ConvexError if user is not authenticated
 */
export async function getAuthenticatedUserId(
  ctx: QueryCtx | MutationCtx,
  operation?: string,
): Promise<string> {
  const userId = (await ctx.auth.getUserIdentity())?.subject;

  if (!userId) {
    const message = operation
      ? `Unauthorized when ${operation}`
      : "Unauthorized";
    console.error(message);
    throw new ConvexError(message);
  }

  return userId;
}

/**
 * Verify that a resource belongs to the authenticated user
 * Throws ConvexError if not authorized
 */
export function verifyOwnership(
  resourceUserId: string,
  authenticatedUserId: string,
  resourceName = "resource",
): void {
  if (resourceUserId !== authenticatedUserId) {
    throw new ConvexError(`Not authorized to access this ${resourceName}`);
  }
}
