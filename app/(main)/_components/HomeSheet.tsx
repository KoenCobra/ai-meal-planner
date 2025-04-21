import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const HomeSheet = ({ open, setOpen }: Props) => {
  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left text-2xl">Bibi</SheetTitle>
        </SheetHeader>
        <div className="mt-6 grid text-left gap-3 px-5">
          <Link className="py-2" onClick={() => setOpen(false)} href="/detox">
            Detox
          </Link>
          <Link className="py-2" onClick={() => setOpen(false)} href="/blog">
            Blog
          </Link>
          <Link
            className="py-2"
            onClick={() => setOpen(false)}
            href="/discover"
          >
            Meal Planner
          </Link>
          <div className="mt-5 flex items-center gap-3 ">
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HomeSheet;
