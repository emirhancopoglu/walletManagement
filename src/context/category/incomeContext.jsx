"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const IncomeCategoryContext = createContext();

export function IncomeCategoryProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    const savedIncomeCategories = JSON.parse(
      localStorage.getItem("incomeCategories")
    );
    return savedIncomeCategories || [];
  });

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("incomeCategories", JSON.stringify(categories));
    }
  }, [categories]);

  const addCategory = (category) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories, category];
      localStorage.setItem(
        "incomeCategories",
        JSON.stringify(updatedCategories)
      );
      return updatedCategories;
    });
  };

  const removeCategory = (value) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.value !== value)
    );
  };

  return (
    <IncomeCategoryContext.Provider
      value={{ categories, addCategory, removeCategory }}
    >
      {children}
    </IncomeCategoryContext.Provider>
  );
}

export const useIncomeCategory = () => useContext(IncomeCategoryContext);
