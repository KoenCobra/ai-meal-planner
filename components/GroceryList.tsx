"use client";

import type React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { sanitizeInput } from "@/lib/utils";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

export function GroceryList() {
  const [newItemName, setNewItemName] = useState("");
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState(false);

  const { data: items, isLoading } = useQuery({
    ...convexQuery(api.groceryList.listItems, {}),
  });

  const addItem = useMutation(api.groceryList.addItem).withOptimisticUpdate(
    (localStore, args) => {
      const items = localStore.getQuery(api.groceryList.listItems, {});
      if (items) {
        const now = Date.now();
        const newItem: Doc<"groceryItems"> = {
          _id: ("optimistic-" + now) as Id<"groceryItems">,
          _creationTime: now,
          userId: "optimistic-user", // Placeholder for optimistic update
          name: args.name,
          quantity: args.quantity,
          checked: false,
        };
        localStore.setQuery(api.groceryList.listItems, {}, [newItem, ...items]);
      }
    },
  );

  const toggleItem = useMutation(
    api.groceryList.toggleItem,
  ).withOptimisticUpdate((localStore, args) => {
    const items = localStore.getQuery(api.groceryList.listItems, {});
    if (items) {
      localStore.setQuery(
        api.groceryList.listItems,
        {},
        items.map((item) =>
          item._id === args.id ? { ...item, checked: !item.checked } : item,
        ),
      );
    }
  });

  const clearAllItems = useMutation(
    api.groceryList.clearAllItems,
  ).withOptimisticUpdate((localStore) => {
    localStore.setQuery(api.groceryList.listItems, {}, []);
  });

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const sanitizedName = sanitizeInput(newItemName.trim());

    await addItem({
      name: sanitizedName,
    });

    setNewItemName("");
  };

  const handleToggleItem = async (itemId: Id<"groceryItems">) => {
    await toggleItem({ id: itemId });
  };

  const handleClearAll = async () => {
    setClearAllDialogOpen(false);
    await clearAllItems();
  };

  const activeItems = items?.filter((item) => !item.checked) || [];
  const checkedItems = items?.filter((item) => item.checked) || [];

  // Then, add a LoadingState component before the return statement
  function LoadingState() {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40 mx-auto" />
        </div>

        <Skeleton className="h-10 w-full" />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>

          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Now modify the return statement to show the loading state when isLoading is true
  // Replace the entire return statement with this:
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 px-4 animate-in fade-in duration-500">
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              Grocery List
            </h1>
          </div>

          {/* Add Item Form */}
          <div>
            <form onSubmit={handleAddItem} className="flex gap-2">
              <Input
                type="text"
                placeholder="Add new item to your list..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" type="submit">
                <Plus className="size-4" />
              </Button>
            </form>
          </div>

          {/* Active Items */}
          {activeItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">Shopping List</h2>
                  <Badge variant="secondary" className="text-xs">
                    {activeItems.length}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setClearAllDialogOpen(true)}
                  className="border-destructive text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </div>

              <div className="space-y-2">
                {activeItems.map((item) => (
                  <div key={item._id}>
                    <div
                      onClick={() => handleToggleItem(item._id)}
                      className="cursor-pointer flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox
                        checked={item.checked}
                        className="h-4 w-4 cursor-pointer"
                      />
                      <div className="flex-1 cursor-pointer">
                        <span className="font-medium">{item.name}</span>
                        {item.quantity && (
                          <span className="text-sm text-muted-foreground ml-2">
                            ({item.quantity})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checked Items */}
          {checkedItems.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-muted-foreground">
                    Completed Items
                  </h2>
                  <Badge variant="outline" className="text-xs">
                    {checkedItems.length}
                  </Badge>
                </div>
                {/* Show Clear All button only when all items are checked */}
                {activeItems.length === 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setClearAllDialogOpen(true)}
                    className="border-destructive text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                {checkedItems.map((item) => (
                  <div key={item._id} className="group">
                    <div
                      className="flex items-center gap-3 p-3 cursor-pointer rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                      onClick={() => handleToggleItem(item._id)}
                    >
                      <Checkbox
                        checked={item.checked}
                        className="h-4 w-4 cursor-pointer"
                      />
                      <div className="flex-1 cursor-pointer">
                        <span className="line-through text-muted-foreground font-medium">
                          {item.name}
                        </span>
                        {item.quantity && (
                          <span className="text-sm text-muted-foreground ml-2 line-through">
                            ({item.quantity})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!items || items.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted rounded-full p-6 inline-flex mb-6">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Your grocery list is empty
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start adding items to your grocery list to keep track of what
                you need to buy.
              </p>
            </div>
          ) : null}
        </>
      )}

      {/* Alert Dialog for Clearing All Items */}
      <AlertDialog
        open={clearAllDialogOpen}
        onOpenChange={setClearAllDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear all items?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all items from your grocery list. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAll}
              className="bg-destructive text-destructive-foreground"
            >
              Clear All Items
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
