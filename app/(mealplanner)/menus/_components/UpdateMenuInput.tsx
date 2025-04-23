import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateMenuInput, createMenuSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2Icon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { ConvexError } from "convex/values";

interface UpdateMenuInputProps {
  name: string;
  menuId: Id<"menus">;
  setOpenUpdateMenu: (open: boolean) => void;
}

const UpdateMenuInput = ({
  name,
  menuId,
  setOpenUpdateMenu,
}: UpdateMenuInputProps) => {
  const { user } = useUser();
  const form = useForm<CreateMenuInput>({
    resolver: zodResolver(createMenuSchema),
    defaultValues: {
      name: name,
    },
  });

  const updateMenu = useMutation(api.menus.updateMenu).withOptimisticUpdate(
    (localStore, args) => {
      const menus = localStore.getQuery(api.menus.getMenus, {
        userId: args.userId,
      });
      if (menus) {
        localStore.setQuery(
          api.menus.getMenus,
          { userId: args.userId },
          menus.map((menu) =>
            menu._id === args.id ? { ...menu, name: args.name } : menu,
          ),
        );
      }
    },
  );

  const onSubmit = async (input: CreateMenuInput) => {
    try {
      setOpenUpdateMenu(false);
      await updateMenu({
        id: menuId,
        userId: user?.id ?? "",
        name: input.name,
      });
      form.reset();
      toast.success("Menu updated successfully");
    } catch (error) {
      const errorMessage =
        error instanceof ConvexError ? error.data : "Error updating menu";
      toast.error(errorMessage);
    }
  };

  if (!user) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e);
        }}
        className="flex items-center gap-2 grow"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Weekly dinner menu"
                  autoFocus
                  className="grow"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="icon"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <Check />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateMenuInput;
