"use client";

import { Button } from "@/components/ui/button";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCreateMenuDialog } from "../hooks";
import DeleteMenuDialog from "./DeleteMenuDialog";
import MenuListActionsPopover from "./MenuListActionsPopover";
import UpdateMenuInput from "./UpdateMenuInput";

const MenuList = ({ menus }: { menus: Doc<"menus">[] }) => {
  const { onOpen } = useCreateMenuDialog();
  const { user } = useUser();

  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [menuId, setMenuId] = useState<Id<"menus"> | null>(null);
  const [updateMenuId, setUpdateMenuId] = useState<string | null>("");

  if (!user) return null;

  return (
    <>
      <div className="flex justify-center">
        <Button
          variant="secondary"
          className="mt-4 mb-6"
          onClick={() => onOpen()}
        >
          Create a menu
          <Plus size={14} />
        </Button>
      </div>
      <div className="space-y-6">
        {menus?.map((menu) => (
          <div className="border border-border rounded-md" key={menu._id}>
            <div className="flex items-center justify-between ">
              {updateMenuId === menu._id ? (
                <div className="flex items-center justify-between grow">
                  <div className="p-4 w-full">
                    <UpdateMenuInput
                      name={menu.name}
                      menuId={menu._id}
                      setOpenUpdateMenu={() => setUpdateMenuId(null)}
                    />
                  </div>
                </div>
              ) : (
                <Link href={`/menus/${menu._id}`} className="grow">
                  <div className="p-4">
                    <p className="text-lg">{menu.name}</p>
                  </div>
                </Link>
              )}

              <div className="pl-6 pr-2 md:px-6">
                <MenuListActionsPopover
                  updateMenuId={updateMenuId}
                  menu={menu}
                  setUpdateMenuId={setUpdateMenuId}
                  setMenuId={setMenuId}
                  setOpenDeleteMenu={() => setOpenDeleteMenu(true)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {menuId && (
        <DeleteMenuDialog
          openDeleteMenu={openDeleteMenu}
          setOpenDeleteMenu={setOpenDeleteMenu}
          menuId={menuId}
        />
      )}
    </>
  );
};

export default MenuList;
