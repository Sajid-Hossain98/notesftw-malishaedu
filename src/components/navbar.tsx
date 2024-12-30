import { Logo } from "./logo";
import { MenuItems } from "./menu-items";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between sm:h-24 h-14">
      <Logo height={55} width={55} />

      <MobileSidebar />

      <div className="md:flex hidden gap-3">
        <MenuItems />
      </div>
    </div>
  );
};
