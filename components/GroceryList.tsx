"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";

export function GroceryList() {
  const { user } = useUser();
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");

  const items = useQuery(api.groceryList.listItems, {
    userId: user?.id ?? "",
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

  const deleteItem = useMutation(
    api.groceryList.deleteItem,
  ).withOptimisticUpdate((localStore, args) => {
    const items = localStore.getQuery(api.groceryList.listItems, {
      userId: args.userId,
    });
    if (items) {
      localStore.setQuery(
        api.groceryList.listItems,
        { userId: args.userId },
        items.filter((item) => item._id !== args.id),
      );
    }
  });

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

  const clearCheckedItems = useMutation(
    api.groceryList.clearCheckedItems,
  ).withOptimisticUpdate((localStore, args) => {
    const items = localStore.getQuery(api.groceryList.listItems, {
      userId: args.userId,
    });
    if (items) {
      localStore.setQuery(
        api.groceryList.listItems,
        { userId: args.userId },
        items.filter((item) => !item.checked),
      );
    }
  });

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    await addItem({
      userId: user?.id ?? "",
      name: newItemName.trim(),
      quantity: newItemQuantity.trim() || undefined,
    });

    setNewItemName("");
    setNewItemQuantity("");
  };

  const handleToggleItem = async (itemId: Id<"groceryItems">) => {
    await toggleItem({ userId: user?.id ?? "", id: itemId });
  };

  const handleDeleteItem = async (itemId: Id<"groceryItems">) => {
    await deleteItem({ userId: user?.id ?? "", id: itemId });
  };

  const handleClearChecked = async () => {
    await clearCheckedItems({ userId: user?.id ?? "" });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Grocery List</h2>
        <Button
          variant="outline"
          onClick={handleClearChecked}
          className="text-sm"
        >
          Clear Checked Items
        </Button>
      </div>

      <form onSubmit={handleAddItem} className="flex gap-2">
        <Input
          type="text"
          placeholder="Item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1"
        />
        <Input
          type="text"
          placeholder="Quantity (optional)"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
          className="w-32"
        />
        <Button type="submit">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="space-y-2">
        {items?.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-2 p-2 bg-background rounded-lg border"
          >
            <Checkbox
              checked={item.checked}
              onCheckedChange={() => handleToggleItem(item._id)}
            />
            <div className="flex-1">
              <span
                className={`${
                  item.checked ? "line-through text-muted-foreground" : ""
                }`}
              >
                {item.name}
              </span>
              {item.quantity && (
                <span className="text-sm text-muted-foreground ml-2">
                  ({item.quantity})
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteItem(item._id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
