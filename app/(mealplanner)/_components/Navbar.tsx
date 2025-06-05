"use client";

import LoginButton from "@/app/(main)/_components/LoginButton";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Book, Calendar, Search, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/bubu-ai",
    label: "Bubu AI",
    icon: (
      <Sparkles className="size-4 absolute -top-1 -right-4 text-blue-500" />
    ),
    mobileIcon: <Sparkles className="size-5 text-blue-500" />,
    mobileOnly: false,
  },
  {
    href: "/search",
    label: "Search",
    icon: null,
    mobileIcon: <Search className="size-5" />,
    mobileOnly: true,
  },
  {
    href: "/recipes",
    label: "Recipes",
    icon: null,
    mobileIcon: <Book className="size-5" />,
    mobileOnly: false,
  },
  {
    href: "/menus",
    label: "Menus",
    icon: null,
    mobileIcon: <Calendar className="size-5" />,
    mobileOnly: false,
  },
  {
    href: "/grocery",
    label: "Grocery",
    icon: null,
    mobileIcon: <ShoppingBag className="size-5" />,
    mobileOnly: false,
  },
] as const;

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="sticky top-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <h1 className="text-2xl font-bold">Bubu</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems
                .filter((item) => !item.mobileOnly)
                .map((item) => (
                  <li key={item.href}>
                    <div className="relative">
                      <Link
                        href={item.href}
                        className={cn(
                          "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                          pathname.startsWith(item.href)
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100",
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

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden md:flex border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>

            <div className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <ThemeToggle />
            </div>

            <SignedOut>
              <LoginButton />
            </SignedOut>
            <SignedIn>
              <div className="relative">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-8 h-8 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-200",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-zinc-200/50 dark:border-zinc-800/50 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full rounded-lg transition-all duration-200 relative",
                pathname.startsWith(item.href)
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300",
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-lg transition-all duration-200",
                  pathname.startsWith(item.href) &&
                    "bg-blue-50 dark:bg-blue-950/30",
                )}
              >
                {item.mobileIcon}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
              {pathname.startsWith(item.href) && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
