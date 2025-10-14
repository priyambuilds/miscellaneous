import { getItem, setItem } from "@/lib/utils/localStorage";
import { createContext, use, useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export default function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "advanced-react-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => getItem(storageKey) ?? defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "light") {
      // Light theme: no class needed, this is the default
    } else if (theme === "dark") {
      root.classList.add("dark");
    } else {
      // System theme: follow the system preference
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (mediaQuery.matches) {
        root.classList.add("dark");
      }
    }

    setItem(storageKey, theme);
  }, [theme, storageKey]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (mediaQuery.matches) {
          root.classList.add("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext>
  );
}

// useTheme hook
export const useTheme = () => {
  const context = use(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
