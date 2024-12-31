"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactionData, setTransactionData] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Gelir");

  useEffect(() => {
    const storedData = localStorage.getItem("transactionData");
    if (storedData) {
      setTransactionData(JSON.parse(storedData));
    }
  }, []);

  const incomeTotal = transactionData
    .filter((transaction) => transaction.type === "Gelir")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0);

  const expenseTotal = transactionData
    .filter((transaction) => transaction.type === "Gider")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0);

  const balance = incomeTotal - expenseTotal;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount);
  };

  const formattedIncomeTotal = formatCurrency(incomeTotal);
  const formattedExpenseTotal = formatCurrency(expenseTotal);
  const formattedBalance = formatCurrency(balance);

  const addTransaction = (transaction) => {
    const updatedTransactionData = [...transactionData, transaction];
    setTransactionData(updatedTransactionData);
    localStorage.setItem(
      "transactionData",
      JSON.stringify(updatedTransactionData)
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactionData,
        addTransaction,
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
        formattedIncomeTotal,
        formattedExpenseTotal,
        formattedBalance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransaction = () => useContext(TransactionContext);
