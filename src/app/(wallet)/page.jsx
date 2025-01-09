import React from "react";

import Transaction from "@/components/transaction/transaction";
import TransactionTable from "@/components/transaction-table/transactionTable";
import IncomeTable from "@/components/category-table/incomeTable";
import ExpenseTable from "@/components/category-table/expenseTable";

import PieChart from "@/components/chart/pie";
import BarChart from "@/components/chart/bar";

export default function Home() {
  return (
    <>
      <Transaction />
      <TransactionTable />
      <div className="container mx-auto flex flex-row gap-4 max-md:flex-col mb-4 max-xl:px-2 items-start">
        <IncomeTable />
        <ExpenseTable />
      </div>
      <div className="flex flex-row w-full container mx-auto gap-4 xl:mb-4 max-md:flex-col max-xl:p-2">
        <BarChart />
        <PieChart />
      </div>
    </>
  );
}
