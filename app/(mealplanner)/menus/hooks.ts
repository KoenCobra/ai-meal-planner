import { create } from "zustand";

interface DialogStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateMenuDialog = create<DialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useAddRecipeToMenuDialog = create<DialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
