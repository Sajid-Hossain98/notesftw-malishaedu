import { BookHeart, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const MenuItems = () => {
  return (
    <div className="hidden gap-3 md:flex">
      <nav>
        <Button variant="myButtons" className="font-semibold gap-1">
          <BookHeart className="w-5 h-5" />
          Code of conduct
        </Button>
      </nav>

      <nav>
        <Button variant="myButtons" className="font-semibold gap-1" asChild>
          <Link href="/add-note" className="flex items-center">
            <Plus className="w-5 h-5" />
            Add notes
          </Link>
        </Button>
      </nav>
    </div>
  );
};
