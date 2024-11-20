import { BookHeart, Plus } from "lucide-react";
import { Button } from "./ui/button";

export const MenuItems = () => {
  return (
    <div className="hidden gap-3 md:flex">
      <nav>
        <Button variant="myButtons" className="font-semibold">
          <BookHeart className="w-5 h-5" />
          Code of conduct
        </Button>
      </nav>

      <nav>
        <Button variant="myButtons" className="font-semibold">
          <Plus className="w-5 h-5" />
          Add a note
        </Button>
      </nav>
    </div>
  );
};
