"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import CreateMenuDialog from "./CreateMenuDialog";
import EmptyMenus from "./EmptyMenus";
import MenuList from "./MenuList";

function MenusLoadingState() {
  return (
    <>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-32 mt-4 mb-6" />
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-border rounded-md">
            <div className="flex items-center justify-between">
              <div className="p-4 grow">
                <Skeleton className="h-6 md:w-48" />
              </div>
              <div className="pl-6 pr-2 md:px-6">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
const MenusOverview = () => {
  const { user } = useUser();

  const { data: menus, isLoading } = useQuery({
    ...convexQuery(api.menus.getMenus, { userId: user?.id ?? "" }),
  });

  if (isLoading) return <MenusLoadingState />;
  if (!user) return null;

  return (
    <>
      {menus?.page.length === 0 ? (
        <EmptyMenus />
      ) : (
        <MenuList menus={menus?.page || []} />
      )}
      <CreateMenuDialog />
    </>
  );
};

export default MenusOverview;
