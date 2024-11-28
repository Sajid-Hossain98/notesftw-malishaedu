import { UserButton } from "@clerk/nextjs";
import { Logo } from "./logo";
import { MenuBar } from "./menu-bar";
import { MenuItems } from "./menu-items";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-24">
      <Logo height={70} width={70} />

      <MenuBar />

      <MenuItems />

      <UserButton />
    </div>
  );
};
