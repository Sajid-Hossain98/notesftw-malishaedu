"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="cursor-pointer px-1">
      {theme === "dark" ? (
        <Sun onClick={() => setTheme("light")} className="w-7 h-7" />
      ) : (
        <Moon onClick={() => setTheme("dark")} className="w-7 h-7" />
      )}
    </div>
  );
}
