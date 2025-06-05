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
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

export function GroceryList() {
  const { user } = useUser();
  const [newItemName, setNewItemName] = useState("");
  const [clearCheckedDialogOpen, setClearCheckedDialogOpen] = useState(false);
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

  const handleDeleteItem = async (itemId: Id<"groceryItems">) => {
    await deleteItem({ userId: user?.id ?? "", id: itemId });
  };

  const handleClearChecked = async () => {
    setClearCheckedDialogOpen(false);
    await clearCheckedItems({ userId: user?.id ?? "" });
  };

  const handleClearAll = async () => {
    setClearAllDialogOpen(false);
    await clearAllItems({ userId: user?.id ?? "" });
  };

  const activeItems = items?.filter((item) => !item.checked) || [];
  const checkedItems = items?.filter((item) => item.checked) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.15 },
    },
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-3">Grocery List</h1>
      </motion.div>

      {/* Add Item Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <form onSubmit={handleAddItem} className="flex gap-2">
          <Input
            type="text"
            placeholder="Add new item to your list..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* Active Items */}
      {activeItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-blue-500" />
              <h2 className="text-lg font-semibold">Shopping List</h2>
              <Badge variant="secondary" className="text-xs">
                {activeItems.length}
              </Badge>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setClearAllDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            <AnimatePresence>
              {activeItems.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ scale: 1.01 }}
                  className="group"
                >
                  <div className="flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => handleToggleItem(item._id)}
                        className="h-4 w-4"
                      />
                    </motion.div>
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleToggleItem(item._id)}
                    >
                      <span className="font-medium">{item.name}</span>
                      {item.quantity && (
                        <span className="text-sm text-muted-foreground ml-2">
                          ({item.quantity})
                        </span>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItem(item._id)}
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}

      {/* Checked Items */}
      {checkedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <h2 className="text-lg font-semibold text-muted-foreground">
                Completed Items
              </h2>
              <Badge variant="outline" className="text-xs">
                {checkedItems.length}
              </Badge>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setClearCheckedDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Completed
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            <AnimatePresence>
              {checkedItems.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  whileHover={{ scale: 1.01 }}
                  className="group"
                >
                  <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => handleToggleItem(item._id)}
                        className="h-4 w-4"
                      />
                    </motion.div>
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleToggleItem(item._id)}
                    >
                      <span className="line-through text-muted-foreground font-medium">
                        {item.name}
                      </span>
                      {item.quantity && (
                        <span className="text-sm text-muted-foreground ml-2 line-through">
                          ({item.quantity})
                        </span>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItem(item._id)}
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && (!items || items.length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-12"
        >
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
        </motion.div>
      )}

      {/* Alert Dialog for Clearing Checked Items */}
      <AlertDialog
        open={clearCheckedDialogOpen}
        onOpenChange={setClearCheckedDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear completed items?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all completed items from your grocery list. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearChecked}>
              Clear Completed
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
