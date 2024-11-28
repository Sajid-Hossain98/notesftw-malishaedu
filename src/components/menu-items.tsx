import { BookHeart, Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const MenuItems = async () => {
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
            Add a note
          </Link>
        </Button>
      </nav>
    </div>
  );
};
