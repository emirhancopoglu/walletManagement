"use client";
import React from "react";
import { Switch } from "@mui/material";
import { useThemeContext } from "@/context/theme/themeContext";

const ThemeChanger = () => {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <Switch checked={theme === "dark"} onChange={toggleTheme} />
    </div>
  );
};

export default ThemeChanger;
