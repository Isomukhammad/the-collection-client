import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem("theme") as Theme) || "light");

  const values = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
};

const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export { ThemeProvider, useTheme };
