"use client";

import { NotebookPen, School } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const AddNoteNavbar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Add Note",
        active: pathname !== "/add-note",
        href: "/add-note",
        icon: NotebookPen,
      },
      {
        label: "Add University",
        active: pathname === "/add-an-university",
        href: "/add-note/add-university",
        icon: School,
      },
    ],
    [pathname]
  );

  return (
    <div>
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          {route.label}
        </Link>
      ))}
    </div>
  );
};
