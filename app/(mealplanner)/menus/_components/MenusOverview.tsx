"use client";

import { api } from "@/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { MenuListSkeleton } from "../../_components/LoadingSkeletons";
import CreateMenuDialog from "./CreateMenuDialog";
import EmptyMenus from "./EmptyMenus";
import MenuList from "./MenuList";

const MenusOverview = () => {
  const { data: menus, isLoading } = useQuery({
    ...convexQuery(api.menus.getMenus, {}),
  });

  if (isLoading) return <MenuListSkeleton />;

  return (
    <div className="animate-in fade-in duration-500">
      {menus?.length === 0 ? <EmptyMenus /> : <MenuList menus={menus || []} />}
      <CreateMenuDialog />
    </div>
  );
};

export default MenusOverview;
