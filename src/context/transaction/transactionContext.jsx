"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useThemeContext } from "@/context/theme/themeContext";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const { theme } = useThemeContext();
  const [transactionData, setTransactionData] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Gelir");

  const incomeTotal = transactionData
    .filter((transaction) => transaction.type === "Gelir")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0);

  const expenseTotal = transactionData
    .filter((transaction) => transaction.type === "Gider")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount || 0), 0);

  const balance = incomeTotal - expenseTotal;

  const formatCurrency = (amount) => {
    return (
      new Intl.NumberFormat("tr-TR", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount) + "₺"
    );
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

    checkSpendingPercentage(updatedTransactionData);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = [...transactionData];
    updatedTransactions.splice(index, 1);
    setTransactionData(updatedTransactions);
    localStorage.setItem(
      "transactionData",
      JSON.stringify(updatedTransactions)
    );
    checkSpendingPercentage(updatedTransactions);
  };

  const checkSpendingPercentage = (data) => {
    const totalIncome = data
      .filter((transaction) => transaction.type === "Gelir")
      .reduce(
        (acc, transaction) => acc + parseFloat(transaction.amount || 0),
        0
      );

    const totalExpense = data
      .filter((transaction) => transaction.type === "Gider")
      .reduce(
        (acc, transaction) => acc + parseFloat(transaction.amount || 0),
        0
      );

    const spentPercentage = (totalExpense / totalIncome) * 100;

    if (spentPercentage >= 80) {
      toast.info(
        `Gelirinizin %${Math.floor(spentPercentage)}'ini harcadınız.`,
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: theme === "dark" ? "dark" : "light",
        }
      );
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("transactionData");
    if (storedData) {
      setTransactionData(JSON.parse(storedData));
    }
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactionData,
        addTransaction,
        deleteTransaction,
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
        formatCurrency,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransaction = () => useContext(TransactionContext);
