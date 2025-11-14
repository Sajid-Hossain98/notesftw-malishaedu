import { BookHeart, CirclePlus, Flag, Mails, Shield } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserData } from "@/types";
import { ModeToggle } from "./mode-toggle";

interface MenuItemsProps {
  userData: UserData | null;
}

export const MenuItems = ({ userData }: MenuItemsProps) => {
  const admin = userData?.role === "ADMIN" || userData?.role === "MODERATOR";
  const canViewProtected = userData?.canViewProtected === true;

  return (
    <>
      <nav className="flex items-center">
        <ModeToggle />
      </nav>

      <nav className="w-full">
        <Button
          variant="myButtons"
          className="w-full font-semibold md:w-fit"
          asChild
          title="Requires login"
        >
          <Link href="/add-note" className="!gap-1">
            <CirclePlus className="w-5 h-5" />
            Add notes
          </Link>
        </Button>
      </nav>

      {(canViewProtected || admin) && (
        <nav className="w-full">
          <Button
            variant="myButtons"
            className="w-full font-semibold md:w-fit"
            asChild
            title="Requires login"
          >
            <Link href="/emails" className="!gap-1">
              <Mails className="w-5 h-5" />
              Emails
            </Link>
          </Button>
        </nav>
      )}

      <nav className="w-full">
        <Button
          variant="myButtons"
          className="w-full font-semibold md:w-fit"
          asChild
        >
          <Link href="/notices" className="!gap-1">
            <Flag className="w-5 h-5" />
            Notices
          </Link>
        </Button>
      </nav>

      <nav className="w-full mt-10 md:mt-0">
        <Button
          variant="myButtons"
          className="w-full font-semibold md:w-fit"
          asChild
        >
          <Link href="/code-of-conduct" className="!gap-1">
            <BookHeart className="w-5 h-5" />
            Code of conduct
          </Link>
        </Button>
      </nav>

      {admin && (
        <nav className="w-full">
          <Button
            variant="myButtons"
            className="w-full gap-1 font-semibold md:w-fit"
            asChild
            title="Admin panel"
          >
            <Link href="/admin">
              <Shield className="!h-6 !w-6" />
            </Link>
          </Button>
        </nav>
      )}
    </>
  );
};
