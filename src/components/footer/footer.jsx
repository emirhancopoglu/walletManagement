"use client";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { useThemeContext } from "@/context/theme/themeContext";

export default function Footer() {
  const { theme } = useThemeContext();
  return (
    <>
      <footer
        className={`flex flex-row justify-center items-center mt-4  ${
          theme === "dark" ? "border-gray-600 border-t" : "border-t"
        }`}
      >
        <div className="flex flex-row mt-2">
          <a href="https://www.linkedin.com/in/emirhancopoglu/" target="_blank">
            <FaLinkedin
              size={50}
              color={`${theme === "dark" ? "#F9F1F0" : "black"}`}
            />
          </a>
          <a href="https://github.com/emirhancopoglu" target="_blank">
            <FaGithubSquare
              size={50}
              color={`${theme === "dark" ? "#F9F1F0" : "black"}`}
            />
          </a>
        </div>
      </footer>
    </>
  );
}
