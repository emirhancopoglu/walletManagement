"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const ExpenseCategoryContext = createContext();

export function ExpenseCategoryProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    const savedExpenseCategories = JSON.parse(
      localStorage.getItem("expenseCategories")
    );
    return savedExpenseCategories || [];
  });

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("expenseCategories", JSON.stringify(categories));
    }
  }, [categories]);

  const addCategory = (category) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories, category];
      localStorage.setItem(
        "expenseCategories",
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
    <ExpenseCategoryContext.Provider
      value={{ categories, addCategory, removeCategory }}
    >
      {children}
    </ExpenseCategoryContext.Provider>
  );
}

export const useExpenseCategory = () => useContext(ExpenseCategoryContext);
