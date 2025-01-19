import { Logo } from "./logo";
import { MenuItems } from "./menu-items";
import { MobileSidebar } from "./mobile-sidebar";
import { currentUserData } from "@/lib/current-user-data";

export const Navbar = async () => {
  const userData = await currentUserData();

  return (
    <div className="w-full flex items-center justify-between sm:h-24 h-14">
      <Logo height={55} width={55} />

      <MobileSidebar />

      <div className="md:flex hidden gap-3">
        <MenuItems userData={userData} />
      </div>
    </div>
  );
};
