"use client";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent } from "./ui/sheet";
import { MenuItems } from "./menu-items";
import { Menu } from "lucide-react";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onMobileSidebarOpen = useMobileSidebar(
    (state) => state.onMobileSidebarOpen
  );
  const onMobileSidebarClose = useMobileSidebar(
    (state) => state.onMobileSidebarClose
  );
  const isMobileSidebarOpen = useMobileSidebar(
    (state) => state.isMobileSidebarOpen
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onMobileSidebarClose();
  }, [pathname, onMobileSidebarClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onMobileSidebarOpen}
        className="md:hidden cursor-pointer"
        asChild
      >
        <Menu className="h-8 w-8 !px-0 !py-0" />
      </Button>

      <Sheet open={isMobileSidebarOpen} onOpenChange={onMobileSidebarClose}>
        <SheetContent
          side="right"
          className="flex flex-col items-center bg-[#0b2c24] w-[60%]"
        >
          <MenuItems />
        </SheetContent>
      </Sheet>
    </>
  );
};
