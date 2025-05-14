"use client";

import LoginButton from "@/app/(main)/_components/LoginButton";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Book, Calendar, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/bibi-ai",
    label: "Bibi AI",
    icon: (
      <Sparkles className="size-4 absolute -top-1 -right-4 text-blue-500" />
    ),
    mobileIcon: <Sparkles className="size-5 text-blue-500" />,
  },
  {
    href: "/recipes",
    label: "Recipes",
    icon: null,
    mobileIcon: <Book className="size-5" />,
  },
  {
    href: "/menus",
    label: "Menus",
    icon: null,
    mobileIcon: <Calendar className="size-5" />,
  },
  {
    href: "/grocery",
    label: "Grocery",
    icon: null,
    mobileIcon: <ShoppingBag className="size-5" />,
  },
] as const;

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="border-b-2 border-border shadow-xs sticky top-0 w-full bg-background z-10">
        <div className="container py-3 flex items-center justify-between">
          <h1
            className="text-2xl font-bold"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Bubu
          </h1>
          <div className="hidden md:block">
            <ul className="flex gap-10 text-xl">
              {navItems.map((item) => (
                <li key={item.href}>
                  <div className="relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "transition-colors",
                        pathname.startsWith(item.href)
                          ? "font-bold"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.icon}
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                pathname.startsWith(item.href)
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {item.mobileIcon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
