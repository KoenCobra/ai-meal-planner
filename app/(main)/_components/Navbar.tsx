"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import LoginButton from "./LoginButton";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-border shadow-xs w-full bg-background">
      <div className="container px-2 py-3 flex items-center justify-between">
        <Link className="text-2xl font-bold" href="/">
          Bubu
        </Link>
        <div className="flex items-center gap-3">
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
      </div>
    </nav>
  );
};

export default Navbar;
