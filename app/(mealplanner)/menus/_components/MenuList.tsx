"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useCreateMenuDialog } from "../hooks";
import DeleteMenuDialog from "./DeleteMenuDialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import UpdateMenuInput from "./UpdateMenuInput";
import MenuListActionsPopover from "./MenuListActionsPopover";
import { useUser } from "@clerk/clerk-react";

const MenuList = () => {
  const { onOpen } = useCreateMenuDialog();
  const { user } = useUser();

  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [menuId, setMenuId] = useState<Id<"menus"> | null>(null);
  const [updateMenuId, setUpdateMenuId] = useState<string | null>("");

  const menus = useQuery(api.menus.listMenus, { userId: user?.id ?? "" });

  if (!user) return null;

  if (!menus) {
    return <p>Loading...</p>;
  }

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
