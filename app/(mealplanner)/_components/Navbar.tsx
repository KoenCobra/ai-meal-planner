"use client";

import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/discover", label: "Discover", icon: null },
  { href: "/menus", label: "Menus", icon: null },
  { href: "/grocery", label: "Grocery", icon: null },
  {
    href: "/bibi-ai",
    label: "Bibi AI",
    icon: (
      <Sparkles className="size-4 absolute -top-1 -right-4 text-blue-500" />
    ),
  },
] as const;

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b-2 border-border shadow-xs sticky top-0 w-full bg-background z-10">
      <div className="container py-5 flex items-center justify-between">
        <h1
          className="text-2xl font-bold"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Bibi
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
        <Menu size={32} />
      </div>
    </nav>
  );
};

export default Navbar;
