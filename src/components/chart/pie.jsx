"use client";
import React, { useEffect, useState } from "react";
import { useTransaction } from "@/context/transaction/transactionContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const { transactionData } = useTransaction();
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
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    });
  }, [transactionData]);

  return (
    <div className="flex border w-1/2 max-md:w-full h-[30rem] shadow rounded-sm px-4 py-4 justify-center bg-gray-100">
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
                  text: "Gelir ve Gider Dağılımı",
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
