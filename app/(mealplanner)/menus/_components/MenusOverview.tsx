"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import CreateMenuDialog from "./CreateMenuDialog";
import EmptyMenus from "./EmptyMenus";
import MenuList from "./MenuList";

const MenusOverview = () => {
  const { user } = useUser();

  const { data: menus } = useQuery({
    ...convexQuery(api.menus.getMenus, { userId: user?.id ?? "" }),
  });

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
