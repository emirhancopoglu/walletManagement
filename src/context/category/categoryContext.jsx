"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(() => {
    // Kullanıcıdan daha önce kaydedilen kategoriler varsa onları al
    const savedCategories = JSON.parse(localStorage.getItem("categories"));
    return savedCategories || []; // Başlangıçta boş dizi
  });

  useEffect(() => {
    // Kategoriler her değiştiğinde localStorage'a kaydedilsin
    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  // Yeni kategori ekleme fonksiyonu
  const addCategory = (category) => {
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories, category];
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      return updatedCategories;
    });
  };

  // Kategori silme fonksiyonu
  const removeCategory = (value) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.value !== value)
    );
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, removeCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => useContext(CategoryContext);
