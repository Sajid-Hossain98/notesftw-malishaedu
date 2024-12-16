"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotebookPen, School } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const AddNoteNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Add a note",
        active: pathname === "/add-note",
        href: "/add-note",
        icon: NotebookPen,
      },
      {
        label: "Add a university",
        active: pathname === "/add-note/add-university",
        href: "/add-note/add-university",
        icon: School,
      },
    ],
    [pathname]
  );

  return (
    <div className="lg:max-w-[80%] md:max-w-[70%] mx-auto bg-[#185339] rounded-full flex justify-around overflow-hidden my-4">
      {routes.map((route) => (
        <Button
          asChild
          key={route.href}
          className={cn(
            "w-full text-base md:text-lg",
            route.active && "text-black bg-[#ebf2fa] hover:bg-[#ebf2fa]"
          )}
        >
          <Link href={route.href} className="font-semibold h-full py-1 md:py-2">
            {route.label}
          </Link>
        </Button>
      ))}
    </div>
  );
};
