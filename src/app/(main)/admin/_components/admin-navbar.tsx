"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotebookPen, School, Users2, Flag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const AdminNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Notes",
        active: pathname === "/admin",
        href: "/admin",
        icon: NotebookPen,
      },
      {
        label: "Universities",
        active: pathname === "/admin/manage-universities",
        href: "/admin/manage-universities",
        icon: School,
      },
      {
        label: "Notices",
        active: pathname === "/admin/manage-notices",
        href: "/admin/manage-notices",
        icon: Flag,
      },
      {
        label: "Users",
        active: pathname === "/admin/manage-users",
        href: "/admin/manage-users",
        icon: Users2,
      },
    ],
    [pathname]
  );

  return (
    <div className="mx-auto bg-[#303030] rounded-full flex justify-around overflow-hidden md:my-2 my-1">
      {routes.map((route) => (
        <Button
          asChild
          key={route.href}
          className={cn(
            "w-full text-xs md:text-lg",
            route.active && "text-black bg-zinc-300 hover:bg-zinc-300/80"
          )}
        >
          <Link
            href={route.href}
            className="font-semibold h-full py-1 md:py-2 min-w-0"
          >
            <route.icon />
            <p className="truncate text-ellipsis">{route.label}</p>
          </Link>
        </Button>
      ))}
    </div>
  );
};
