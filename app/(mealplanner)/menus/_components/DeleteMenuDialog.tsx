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
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { toast } from "sonner";

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
  const deleteMenu = useMutation(api.menus.deleteMenu).withOptimisticUpdate(
    (localStore, args) => {
      const menus = localStore.getQuery(api.menus.getMenus, {});
      if (menus) {
        localStore.setQuery(
          api.menus.getMenus,
          {},
          menus.filter((menu) => menu._id !== args.id),
        );
      }
    },
  );

  const handleDelete = async () => {
    try {
      await deleteMenu({ id: menuId });
      setOpenDeleteMenu(false);
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError ? error.data : "Error deleting menu";
      toast.error(errorMessage);
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
