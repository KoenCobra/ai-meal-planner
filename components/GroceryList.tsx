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
      <h2 className="text-2xl font-bold">Grocery List</h2>

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

      {items && items.length > 0 && (
        <div>
          {/* Active Items Section */}
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Active Items
          </h3>
          <div className="flex flex-col gap-2">
            {items
              .filter((item) => !item.checked)
              .map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-2 bg-background rounded-lg border m-0"
                >
                  <Checkbox
                    checked={item.checked}
                    onCheckedChange={() => handleToggleItem(item._id)}
                    className="ml-2"
                  />
                  <div
                    className="flex-1 p-2"
                    onClick={() => handleToggleItem(item._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{item.name}</span>
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
                    className="mr-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>

          {/* Completed Items Section */}
          {items.some((item) => item.checked) && (
            <div className="space-y-2 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-muted-foreground">
                  Completed Items
                </h3>
                <Button
                  variant="ghost"
                  onClick={handleClearChecked}
                  className="text-sm h-8"
                >
                  Clear All
                </Button>
              </div>
              {items
                .filter((item) => item.checked)
                .map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-2 bg-muted/50 rounded-lg border border-muted"
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => handleToggleItem(item._id)}
                      className="ml-2"
                    />
                    <div
                      className="flex-1 p-2"
                      onClick={() => handleToggleItem(item._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="line-through text-muted-foreground">
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
                      className="mr-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
