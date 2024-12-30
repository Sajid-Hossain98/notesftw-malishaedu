import { BookHeart, Plus, Shield } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const MenuItems = () => {
  return (
    <>
      <nav className="w-full mt-10 md:mt-0">
        <Button
          variant="myButtons"
          className="font-semibold gap-1 md:w-fit w-full"
        >
          <BookHeart className="w-5 h-5" />
          Code of conduct
        </Button>
      </nav>

      <nav className="w-full">
        <Button
          variant="myButtons"
          className="font-semibold gap-1 md:w-fit w-full"
          asChild
        >
          <Link href="/add-note" className="flex items-center">
            <Plus className="w-5 h-5" />
            Add notes
          </Link>
        </Button>
      </nav>

      <nav className="w-full">
        <Button
          variant="myButtons"
          className="font-semibold gap-1 md:w-fit w-full"
          asChild
        >
          <Link href="/admin">
            <Shield strokeWidth={3} className="!h-6 !w-6" />
          </Link>
        </Button>
      </nav>
    </>
  );
};
