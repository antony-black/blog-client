import React, { createContext, useState } from "react";

type TThemeColor = "dark" | "light";

type TThemeContext = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<TThemeContext>({
  theme: "dark",
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem("theme");
  const currentTheme = storedTheme ? (storedTheme as TThemeColor) : "dark";

  const [theme, setTheme] = useState<TThemeColor>(currentTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
        </main>
    </ThemeContext.Provider>
  );
};
