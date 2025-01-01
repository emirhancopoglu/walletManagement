"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { createTheme, ThemeProvider } from "@mui/material";

const ThemeContext = createContext();

export const ThemeSwitchProvider = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const muiTheme = createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
