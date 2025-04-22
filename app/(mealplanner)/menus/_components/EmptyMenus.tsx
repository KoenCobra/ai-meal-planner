"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useCreateMenuDialog } from "../hooks";

const EmptyMenus = () => {
  const { onOpen } = useCreateMenuDialog();

  return (
    <>
      <div className="text-center">
        <p className="text-gray-500">You haven&apos;t created any menus yet.</p>
        <Button variant="secondary" className="mt-4" onClick={() => onOpen()}>
          Create a menu
          <Plus size={14} />
        </Button>
      </div>
    </>
  );
};

export default EmptyMenus;
