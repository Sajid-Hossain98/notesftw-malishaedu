import { Logo } from "./logo";
import { MenuBar } from "./menu-bar";
import { MenuItems } from "./menu-items";

export const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between sm:h-24 h-14">
      <Logo height={70} width={70} />

      <MenuBar />

      <MenuItems />
    </div>
  );
};
