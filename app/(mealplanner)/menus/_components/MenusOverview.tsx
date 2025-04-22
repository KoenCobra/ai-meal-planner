"use client";

import React from "react";
import EmptyMenus from "./EmptyMenus";
import MenuList from "./MenuList";
import CreateMenuDialog from "./CreateMenuDialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";

const MenusOverview = () => {
  const { user } = useUser();

  const menus = useQuery(api.menus.listMenus, { userId: user?.id ?? "" });

  if (!user) return null;

  return (
    <>
      {menus?.length === 0 ? <EmptyMenus /> : <MenuList />}
      <CreateMenuDialog />
    </>
  );
};

export default MenusOverview;
