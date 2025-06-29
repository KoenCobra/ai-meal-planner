"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import LoginButton from "./LoginButton";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-1 w-full bg-white/80 dark:bg-zinc-900/30 backdrop-blur-lg border-0 shadow-sm">
      <div className="container px-2 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <div className="relative flex items-baseline">
            <h1 className="text-2xl font-medium tracking-tight text-zinc-900 dark:text-white transition-colors">
              Bubu
            </h1>
            <span className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent ml-2 transition-all">
              AI
            </span>
            {/* Gradient underline */}
            <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
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
