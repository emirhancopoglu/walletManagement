"use client";
import React from "react";
import { Switch } from "@mui/material";
import { useThemeContext } from "@/context/theme/themeContext";

const ThemeChanger = () => {
  const { theme, setTheme } = useThemeContext(); // Tema verisini alıyoruz

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark"); // Tema değiştirme
  };

  return (
    <div>
      <Switch checked={theme === "dark"} onChange={toggleTheme} />
    </div>
  );
};

export default ThemeChanger;
