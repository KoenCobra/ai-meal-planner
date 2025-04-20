"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import HomeSheet from "./HomeSheet";
import LoginButton from "./LoginButton";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b-2 border-border shadow-xs w-full bg-background">
      <div className="container mx-auto py-3 flex items-center justify-between">
        <Link className="text-2xl font-bold" href="/">
          BUBU
        </Link>
        <div className="hidden md:block">
          <ul className="flex gap-5">
            <li>
              <Link href="/detox">Detox</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/discover">Meal Planner</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SignedOut>
              <LoginButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="md:hidden">
          <Button onClick={() => setOpen(true)} variant="ghost">
            <Menu />
          </Button>
        </div>
      </div>
      <HomeSheet open={open} setOpen={setOpen} />
    </nav>
  );
};

export default Navbar;
