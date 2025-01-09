"use client";
import React, { useEffect, useState } from "react";
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
import { useTransaction } from "@/context/transaction/transactionContext";
import { useThemeContext } from "@/context/theme/themeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const { transactionData } = useTransaction();
  const { theme } = useThemeContext();
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
          backgroundColor: "#BBF7D0",
          borderColor: "#BBF7D0",
          borderWidth: 1,
        },
        {
          label: "Gider",
          data: expenseValues,
          backgroundColor: "#FECACA",
          borderColor: "#FECACA",
          borderWidth: 1,
        },
      ],
    });
  }, [transactionData]);

  return (
    <>
      {chartData && transactionData.length > 0 ? (
        <div className={`flex w-1/2 max-md:w-full h-[30rem] justify-center`}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Kategoriye Göre Gelir ve Gider Grafiği",
                },
              },
            }}
          />
        </div>
      ) : (
        <div
          className={`flex w-1/2 max-md:w-full h-[30rem] justify-center ${
            theme === "dark"
              ? "border border-gray-600 bg-[#0F1214] rounded-sm"
              : "border bg-gray-50 rounded-sm"
          }`}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="font-semibold text-center">
              Herhangi Bir Veri Bulunamadı.
            </div>
            <div className="text-sm">
              Grafiği görüntülemek için yeni işlem oluşturun.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
