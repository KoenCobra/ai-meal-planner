import { create } from "zustand";
import { Id } from "@/convex/_generated/dataModel";

interface AddToMenuDialogState {
  open: boolean;
  recipeId: Id<"recipes"> | null;
  openDialog: (recipeId: Id<"recipes">) => void;
  closeDialog: () => void;
}

export const useAddToMenuDialogStore = create<AddToMenuDialogState>((set) => ({
  open: false,
  recipeId: null,
  openDialog: (recipeId) => set({ open: true, recipeId }),
  closeDialog: () => set({ open: false, recipeId: null }),
}));
