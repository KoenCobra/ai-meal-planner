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
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { sanitizeInput } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

export function GroceryList() {
  const { user } = useUser();
  const [newItemName, setNewItemName] = useState("");
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState(false);

  const { data: items, isLoading } = useQuery({
    ...convexQuery(api.groceryList.listItems, {
      userId: user?.id ?? "",
    }),
  });

  const addItem = useMutation(api.groceryList.addItem).withOptimisticUpdate(
    (localStore, args) => {
      const items = localStore.getQuery(api.groceryList.listItems, {
        userId: args.userId,
      });
      if (items) {
        const now = Date.now();
        const newItem: Doc<"groceryItems"> = {
          _id: ("optimistic-" + now) as Id<"groceryItems">,
          _creationTime: now,
          userId: args.userId,
          name: args.name,
          quantity: args.quantity,
          checked: false,
        };
        localStore.setQuery(
          api.groceryList.listItems,
          { userId: args.userId },
          [newItem, ...items],
        );
      }
    },
  );

  const toggleItem = useMutation(
    api.groceryList.toggleItem,
  ).withOptimisticUpdate((localStore, args) => {
    const items = localStore.getQuery(api.groceryList.listItems, {
      userId: args.userId,
    });
    if (items) {
      localStore.setQuery(
        api.groceryList.listItems,
        { userId: args.userId },
        items.map((item) =>
          item._id === args.id ? { ...item, checked: !item.checked } : item,
        ),
      );
    }
  });

  const clearAllItems = useMutation(
    api.groceryList.clearAllItems,
  ).withOptimisticUpdate((localStore, args) => {
    localStore.setQuery(api.groceryList.listItems, { userId: args.userId }, []);
  });

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const sanitizedName = sanitizeInput(newItemName.trim());

    await addItem({
      userId: user?.id ?? "",
      name: sanitizedName,
    });

    setNewItemName("");
  };

  const handleToggleItem = async (itemId: Id<"groceryItems">) => {
    await toggleItem({ userId: user?.id ?? "", id: itemId });
  };

  const handleClearAll = async () => {
    setClearAllDialogOpen(false);
    await clearAllItems({ userId: user?.id ?? "" });
  };

  const activeItems = items?.filter((item) => !item.checked) || [];
  const checkedItems = items?.filter((item) => item.checked) || [];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 px-4 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Grocery List</h1>
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
                variant="destructive"
                size="sm"
                onClick={() => setClearAllDialogOpen(true)}
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
      {!isLoading && (!items || items.length === 0) && (
        <div className="text-center py-12">
          <div className="bg-muted rounded-full p-6 inline-flex mb-6">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Your grocery list is empty
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start adding items to your grocery list to keep track of what you
            need to buy.
          </p>
        </div>
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
