"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotebookPen, School, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const AdminNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Manage notes",
        active: pathname === "/admin",
        href: "/admin",
        icon: NotebookPen,
      },
      {
        label: "Manage universities",
        active: pathname === "/admin/manage-universities",
        href: "/admin/manage-universities",
        icon: School,
      },
      {
        label: "Manage users",
        active: pathname === "/admin/manage-users",
        href: "/admin/manage-users",
        icon: Users2,
      },
    ],
    [pathname]
  );

  return (
    <div className="mx-auto bg-[#242424] rounded-full flex justify-around overflow-hidden my-4">
      {routes.map((route) => (
        <Button
          asChild
          key={route.href}
          className={cn(
            "w-full text-base md:text-lg",
            route.active && "text-black bg-[#F7F7F7] hover:bg-[#f7f7f7e0]"
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
