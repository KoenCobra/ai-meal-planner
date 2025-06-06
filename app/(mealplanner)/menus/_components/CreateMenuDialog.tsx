"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { sanitizeInput } from "@/lib/utils";
import { CreateMenuInput, createMenuSchema } from "@/lib/validation";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateMenuDialog } from "../hooks";

const CreateMenuDialog = () => {
  const { isOpen, onClose } = useCreateMenuDialog();
  const { user } = useUser();

  const form = useForm<CreateMenuInput>({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      name: "",
    },
  });

  const createMenuMutation = useMutation(
    api.menus.createMenu,
  ).withOptimisticUpdate((localStore, args) => {
    const menus = localStore.getQuery(api.menus.getMenus, {
      userId: args.userId,
    });
    if (menus) {
      const now = Date.now();
      const newMenu = {
        _id: ("optimistic-" + now) as Id<"menus"> | string, // Temporary ID for optimistic UI
        _creationTime: now,
        userId: args.userId,
        name: args.name,
      };
      localStore.setQuery(
        api.menus.getMenus,
        { userId: args.userId },
        {
          page: [newMenu as Doc<"menus">, ...menus.page],
          isDone: menus.isDone,
          continueCursor: menus.continueCursor,
        },
      );
    }
  });

  const onSubmit = async (input: CreateMenuInput) => {
    try {
      onClose();

      // Sanitize the input name before sending to the server
      const sanitizedName = sanitizeInput(input.name);

      await createMenuMutation({
        userId: user?.id ?? "",
        name: sanitizedName,
      });

      form.reset();
      toast.success("Menu created successfully");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError ? error.data : "Error creating menu";
      toast.error(errorMessage);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose} defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create menu</DialogTitle>
          <DialogDescription>Enter a name for your new menu.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Weekly dinner menu"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full sm:w-auto"
                variant="outline"
              >
                {form.formState.isSubmitting ? (
                  <>
                    Creating...
                    <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Create Menu"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMenuDialog;
