"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const IncomeContext = createContext();

export function IncomeProvider({ children }) {
  const [incomeData, setIncomeData] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Gelir");

  useEffect(() => {
    const storedData = localStorage.getItem("incomeData");
    if (storedData) {
      setIncomeData(JSON.parse(storedData));
    }
  }, []);

  const totalAmount = incomeData.reduce(
    (acc, income) => acc + parseFloat(income.amount || 0),
    0
  );

  const formattedTotalAmount = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(totalAmount);

  const addIncome = (income) => {
    const updatedIncomeData = [...incomeData, income];
    setIncomeData(updatedIncomeData);
    localStorage.setItem("incomeData", JSON.stringify(updatedIncomeData));
  };

  return (
    <IncomeContext.Provider
      value={{
        incomeData,
        addIncome,
        category,
        setCategory,
        description,
        setDescription,
        amount,
        setAmount,
        type,
        setType,
        date,
        setDate,
        formattedTotalAmount,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
}

export const useIncome = () => useContext(IncomeContext);
