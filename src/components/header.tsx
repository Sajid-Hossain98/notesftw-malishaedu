import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn(className)}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
