"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
      area-label="Dark mode/light mode toggle"
      title={`${isDark ? "Let there be light" : "Embrace the dark"}`}
    >
      {isDark ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
    </button>
  );
}
