"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mails } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const EmailActivitiesNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "All Emails",
        active: pathname === "/emails/all",
        href: "/emails/all",
        icon: Mails,
      },
    ],
    [pathname]
  );

  return (
    <div className="w-full flex items-center justify-end">
      {routes.map((route) => (
        <Button
          asChild
          key={route.href}
          variant="myButtons"
          className={cn(
            route.active &&
              "dark:text-black bg-zinc-300 hover:bg-zinc-300 dark:bg-zinc-300 dark:hover:bg-zinc-300/80"
          )}
        >
          <Link
            href={route.href}
            className="h-full min-w-0 py-1 font-semibold md:py-2"
          >
            <route.icon className="w-5 h-5" />
            <p className="truncate text-ellipsis">{route.label}</p>
          </Link>
        </Button>
      ))}
    </div>
  );
};
