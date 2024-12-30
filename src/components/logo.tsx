import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width: number;
  height: number;
  className?: string;
}

export const Logo = ({ width, height, className }: LogoProps) => {
  return (
    <Link href="/">
      <div>
        <Image
          src="/logo-light.svg"
          alt="Logo"
          width={width}
          height={height}
          loading="eager"
          className={cn("w-12 md:w-14", className)}
        />
      </div>
    </Link>
  );
};
