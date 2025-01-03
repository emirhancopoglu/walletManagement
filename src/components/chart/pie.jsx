"use client";
import React, { useEffect, useState } from "react";
import { useTransaction } from "@/context/transaction/transactionContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useThemeContext } from "@/context/theme/themeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const { transactionData } = useTransaction();
  const { theme } = useThemeContext();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const incomeTotal = transactionData
      .filter((transaction) => transaction.type === "Gelir")
      .reduce((acc, item) => acc + parseFloat(item.amount), 0);

    const expenseTotal = transactionData
      .filter((transaction) => transaction.type === "Gider")
      .reduce((acc, item) => acc + parseFloat(item.amount), 0);

    setChartData({
      labels: ["Gelir", "Gider"],
      datasets: [
        {
          data: [incomeTotal, expenseTotal],
          backgroundColor: ["#BBF7D0", "#FECACA"],
          borderColor: ["#BBF7D0", "#FECACA"],
          borderWidth: 1,
        },
      ],
    });
  }, [transactionData]);

  return (
    <div
      className={`flex w-1/2 max-md:w-full h-[30rem] shadow rounded-sm px-4 py-4 justify-center  ${
        theme === "dark"
          ? "border border-gray-600 bg-[#0F1214]"
          : "border bg-gray-50"
      }`}
    >
      {chartData && transactionData.length > 0 ? (
        <>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
                title: {
                  display: true,
                  text: "Gelir ve Gider Oranı",
                },
              },
            }}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col px-4 py-4 justify-center items-">
            <div className="font-semibold text-center">
              Herhangi Bir Veri Bulunamadı.
            </div>
            <div className="text-sm">
              Grafiği görüntülemek için yeni işlem oluşturun.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
