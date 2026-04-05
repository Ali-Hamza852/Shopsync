import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("shopsync-theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
  }
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("shopsync-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme, isDark: theme === "dark" };
}
