import { ConvexError } from "convex/values";
import { Doc, Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { verifyOwnership } from "../lib/auth";

export interface GroceryItemInput {
  name: string;
  unit?: string;
  quantity?: number;
}

/**
 * Add or update a grocery item for a user
 */
export async function addOrUpdateGroceryItem(
  ctx: MutationCtx,
  userId: string,
  name: string,
  unit: string,
  quantity: number,
): Promise<Id<"groceryItems">> {
  // Check if item with same name and unit already exists
  const existingItem = await ctx.db
    .query("groceryItems")
    .withIndex("by_user_name_and_unit", (q) =>
      q
        .eq("userId", userId)
        .eq("name", name.toLowerCase())
        .eq("unit", unit.toLowerCase()),
    )
    .first();

  if (existingItem && existingItem.quantity) {
    // Add quantities together if same name and unit
    const totalQuantity = existingItem.quantity + quantity;

    await ctx.db.patch(existingItem._id, {
      quantity: totalQuantity,
    });

    return existingItem._id;
  }

  return await ctx.db.insert("groceryItems", {
    userId,
    name: name.toLowerCase(),
    unit: unit.toLowerCase(),
    quantity,
    checked: false,
  });
}

/**
 * Get all grocery items for a user
 */
export async function getUserGroceryItems(
  ctx: QueryCtx,
  userId: string,
): Promise<Doc<"groceryItems">[]> {
  return await ctx.db
    .query("groceryItems")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .order("desc")
    .collect();
}

/**
 * Toggle a grocery item's checked status
 */
export async function toggleGroceryItem(
  ctx: MutationCtx,
  userId: string,
  itemId: Id<"groceryItems">,
): Promise<void> {
  const item = await ctx.db.get(itemId);
  if (!item) throw new ConvexError("Item not found");

  verifyOwnership(item.userId, userId, "grocery item");

  await ctx.db.patch(itemId, { checked: !item.checked });
}

/**
 * Clear all grocery items for a user
 */
export async function clearAllUserGroceryItems(
  ctx: MutationCtx,
  userId: string,
): Promise<void> {
  const allItems = await ctx.db
    .query("groceryItems")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .collect();

  for (const item of allItems) {
    await ctx.db.delete(item._id);
  }
}
