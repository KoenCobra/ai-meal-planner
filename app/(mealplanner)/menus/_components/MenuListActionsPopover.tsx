import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import React from "react";

interface MenuListActionsPopoverProps {
  updateMenuId: string | null;
  menu: Doc<"menus">;
  setUpdateMenuId: (menuId: string | null) => void;
  setMenuId: (menuId: Id<"menus">) => void;
  setOpenDeleteMenu: (open: boolean) => void;
}

const MenuListActionsPopover = ({
  updateMenuId,
  menu,
  setUpdateMenuId,
  setMenuId,
  setOpenDeleteMenu,
}: MenuListActionsPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="rounded-full text-muted-foreground">
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-min p-2 flex flex-col gap-2">
        <Button
          onClick={() => {
            setUpdateMenuId(updateMenuId === menu._id ? null : menu._id);
          }}
          variant="ghost"
          className="rounded-full text-muted-foreground"
        >
          <Pencil size={14} className="mr-2" />
          Update
        </Button>
        <Button
          onClick={() => {
            setMenuId(menu._id);
            setOpenDeleteMenu(true);
          }}
          variant="ghost"
          className="rounded-full text-muted-foreground"
        >
          <Trash size={14} className="mr-2" />
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default MenuListActionsPopover;
