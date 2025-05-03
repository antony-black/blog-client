import React, { createContext, useState } from "react";
import { ELocalStorageKeys } from "@/enums";

const LIGHT: string = "light";
const DARK: string = "dark";

type TThemeColor = typeof DARK | typeof LIGHT;

type TThemeContext = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<TThemeContext>({
  theme: DARK,
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem(ELocalStorageKeys.THEME);
  const currentTheme = storedTheme ? (storedTheme as TThemeColor) : DARK;

  const [theme, setTheme] = useState<TThemeColor>(currentTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === LIGHT ? DARK : LIGHT;
      localStorage.setItem(ELocalStorageKeys.THEME, newTheme);

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
