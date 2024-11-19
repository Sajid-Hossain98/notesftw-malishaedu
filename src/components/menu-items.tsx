import { BookHeart, Plus } from "lucide-react";
import { Button } from "./ui/button";

export const MenuItems = () => {
  return (
    <div className="hidden gap-2 md:flex">
      <nav>
        <Button variant="myButtons">
          <BookHeart className="w-5 h-5" />
          Code of conduct
        </Button>
      </nav>

      <nav>
        <Button variant="myButtons">
          <Plus className="w-5 h-5" />
          Add a note
        </Button>
      </nav>
    </div>
  );
};
