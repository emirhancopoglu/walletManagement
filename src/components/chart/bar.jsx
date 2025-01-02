"use client";
import React, { useEffect, useState } from "react";
import { useTransaction } from "@/context/transaction/transactionContext";
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
  const { transactionData } = useTransaction();
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
    <div className="flex border w-1/2 max-md:w-full h-[30rem] shadow rounded-sm px-4 py-4 justify-center bg-gray-100">
      {chartData && transactionData.length > 0 ? (
        <>
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