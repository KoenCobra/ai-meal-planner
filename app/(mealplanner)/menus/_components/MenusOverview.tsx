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

  const menus = useQuery(api.menus.getMenus, { userId: user?.id ?? "" });

  if (!user) return null;

  if (!menus) return <p>Loading...</p>;

  return (
    <>
      {menus?.length === 0 ? <EmptyMenus /> : <MenuList menus={menus} />}
      <CreateMenuDialog />
    </>
  );
};

export default MenusOverview;
