import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      className="rounded-full p-2"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-5 w-5" />
          Light mode
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" />
          Dark mode
        </>
      )}
    </Button>
  );
}
