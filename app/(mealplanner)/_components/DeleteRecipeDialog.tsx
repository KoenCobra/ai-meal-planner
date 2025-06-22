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

interface DeleteRecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  recipeName: string;
  mode?: "delete" | "remove"; // "delete" = permanently delete, "remove" = remove from menu
}

const DeleteRecipeDialog = ({
  open,
  onOpenChange,
  onConfirm,
  recipeName,
  mode = "delete",
}: DeleteRecipeDialogProps) => {
  const isRemoving = mode === "remove";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {isRemoving ? (
              <>
                This will remove the recipe &quot;{recipeName}&quot; from this
                menu. The recipe will still be available in your recipe
                collection.
              </>
            ) : (
              <>
                This will permanently delete the recipe &quot;{recipeName}&quot;
                and remove it from any menus it&apos;s been added to.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {isRemoving ? "Remove" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRecipeDialog;
