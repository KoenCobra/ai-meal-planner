import React from "react";
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
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
interface DeleteMenuDialogProps {
  openDeleteMenu: boolean;
  setOpenDeleteMenu: (open: boolean) => void;
  menuId: Id<"menus">;
}

const DeleteMenuDialog = ({
  openDeleteMenu,
  setOpenDeleteMenu,
  menuId,
}: DeleteMenuDialogProps) => {
  const { user } = useUser();
  const deleteMenu = useMutation(api.menus.deleteMenu);

  const handleDelete = async () => {
    const result = await deleteMenu({ id: menuId, userId: user?.id ?? "" });
    if (result?.success) {
      setOpenDeleteMenu(false);
      toast.success("Menu deleted successfully");
    } else {
      toast.error("Failed to delete menu. Please try again. ");
    }
  };

  return (
    <AlertDialog open={openDeleteMenu} onOpenChange={setOpenDeleteMenu}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your menu
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleDelete}>
            Delete menu
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMenuDialog;
