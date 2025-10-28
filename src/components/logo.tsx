"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  width: number;
  height: number;
  className?: string;
}

export const Logo = ({ width, height, className }: LogoProps) => {
  const { theme, systemTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        style={{ width, height }}
        className={cn(
          "dark:bg-slate-800 bg-zinc-300 animate-pulse rounded-full",
          className
        )}
      />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Link href="/">
      <div>
        <Image
          priority
          src={
            currentTheme === "dark"
              ? "/static/logo-light.svg"
              : "/static/logo-dark.svg"
          }
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
