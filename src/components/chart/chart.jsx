"use client";
import React, { useEffect, useState } from "react";
import { useTransaction } from "@/context/income/transactionContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart() {
  const { transactionData } = useTransaction(); // Transaction verilerini alıyoruz
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const incomeData = transactionData.filter(
      (transaction) => transaction.type === "Gelir"
    );
    const expenseData = transactionData.filter(
      (transaction) => transaction.type === "Gider"
    );

    const categories = [
      ...new Set([
        ...incomeData.map((item) => item.category),
        ...expenseData.map((item) => item.category),
      ]),
    ];
    const incomeValues = categories.map((category) =>
      incomeData
        .filter((item) => item.category === category)
        .reduce((acc, item) => acc + parseFloat(item.amount), 0)
    );
    const expenseValues = categories.map((category) =>
      expenseData
        .filter((item) => item.category === category)
        .reduce((acc, item) => acc + parseFloat(item.amount), 0)
    );

    setChartData({
      labels: categories,
      datasets: [
        {
          label: "Gelir",
          data: incomeValues,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Gider",
          data: expenseValues,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [transactionData]);

  return (
    <div className="container mx-auto w-1/2">
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
}
