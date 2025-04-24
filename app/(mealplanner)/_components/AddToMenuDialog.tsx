"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id, Doc } from "@/convex/_generated/dataModel";

interface AddToMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipeId: Id<"recipes">;
  onSuccess?: () => void;
}

const AddToMenuDialog: React.FC<AddToMenuDialogProps> = ({
  open,
  onOpenChange,
  recipeId,
  onSuccess,
}) => {
  const { user } = useUser();
  const [selectedMenus, setSelectedMenus] = useState<Id<"menus">[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const menus = useQuery(
    api.menus.getMenus,
    user ? { userId: user.id } : "skip",
  );
  const addRecipeToMenu = useMutation(api.menus.addRecipeToMenu);

  const handleCheckboxChange = (menuId: Id<"menus">) => {
    setSelectedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId],
    );
  };

  const handleAdd = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      selectedMenus.map((menuId) =>
        addRecipeToMenu({
          userId: user.id,
          menuId,
          recipeId,
        }),
      );
      setSelectedMenus([]);
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "Failed to add recipe to menu(s)",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Menu</DialogTitle>
          <DialogDescription>
            Select one or more menus to add this recipe to.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-64 overflow-y-auto space-y-2 my-4">
          {!menus ? (
            <div>Loading menus...</div>
          ) : menus.length === 0 ? (
            <div className="text-muted-foreground">No menus found.</div>
          ) : (
            menus.map((menu: Doc<"menus">) => (
              <label
                key={menu._id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox
                  checked={selectedMenus.includes(menu._id)}
                  onCheckedChange={() => handleCheckboxChange(menu._id)}
                  id={`menu-checkbox-${menu._id}`}
                />
                <span className="text-base">{menu.name}</span>
              </label>
            ))
          )}
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <DialogFooter>
          <Button
            onClick={handleAdd}
            disabled={loading || selectedMenus.length === 0}
          >
            {loading ? "Adding..." : "Add to selected menu(s)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToMenuDialog;
