"use client";
import React from "react";
import IncomeTable from "@/components/category-table/incomeTable";
import ExpenseTable from "@/components/category-table/expenseTable";

export default function Settings() {
  return (
    <div className="container mx-auto mt-4 mb-4 pl-2 pr-2">
      <div className="flex flex-row gap-4 max-md:flex-col">
        <IncomeTable />
        <ExpenseTable />
      </div>
    </div>
  );
}
