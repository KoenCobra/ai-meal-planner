"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useMenuAssociations } from "../_hooks/useMenuAssociations";

interface AddToMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipeId: Id<"recipes"> | null;
  onSuccess?: () => void;
}

const AddToMenuDialog: React.FC<AddToMenuDialogProps> = ({
  open,
  onOpenChange,
  recipeId,
  onSuccess,
}) => {
  const { user } = useUser();

  const {
    menus,
    selectedMenus,
    loading,
    error,
    handleCheckboxChange,
    saveMenuAssociations,
  } = useMenuAssociations({
    userId: user?.id || "",
    recipeId,
  });

  if (!user || !recipeId) return null;

  const handleSave = async () => {
    const success = await saveMenuAssociations();
    if (success) {
      onOpenChange(false);
      onSuccess?.();
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
          ) : menus.page?.length === 0 ? (
            <div className="text-muted-foreground">No menus found.</div>
          ) : (
            menus.page.map((menu) => (
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
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToMenuDialog;
