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
          src="/malishaedu-logo-with-border.svg"
          alt="MalishaEdu's Logo"
          width={width}
          height={height}
          className={cn(className)}
        />
      </div>
    </Link>
  );
};
