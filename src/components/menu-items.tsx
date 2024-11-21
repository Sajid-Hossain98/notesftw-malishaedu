import { BookHeart, Plus } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

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
        <Link href="/sign-in" className="flex items-center gap-1">
          <Button variant="myButtons" className="font-semibold">
            <Plus className="w-5 h-5" />
            Add a note
          </Button>
        </Link>
      </nav>
    </div>
  );
};
