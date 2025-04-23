"use client";

import React from "react";
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
import { Loader2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateMenuDialog } from "../hooks";
import { CreateMenuInput, createMenuSchema } from "@/lib/validation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { Doc, Id } from "@/convex/_generated/dataModel";

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
      localStore.setQuery(api.menus.getMenus, { userId: args.userId }, [
        newMenu as Doc<"menus">,
        ...menus,
      ]);
    }
  });

  const onSubmit = async (input: CreateMenuInput) => {
    try {
      onClose();
      await createMenuMutation({ userId: user?.id ?? "", name: input.name });
      form.reset();
      toast.success("Menu created successfully");
    } catch (error) {
      console.error("Failed to create menu:", error);
      toast.error("Failed to create menu. Please try again.");
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
