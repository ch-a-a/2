"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedTheme = storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDark(resolvedTheme);
    document.documentElement.classList.toggle("dark", resolvedTheme);
    document.documentElement.style.colorScheme = resolvedTheme ? "dark" : "light";
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-9 w-9 rounded-full p-0"
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
