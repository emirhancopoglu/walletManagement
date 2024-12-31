"use client";
import React, { useState } from "react";
import Stats from "@/components/stats/stats";
import Income from "@/components/tab/income";
import Expense from "@/components/tab/expense";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import { useIncome } from "@/context/income/incomeContext";

export default function Transaction() {
  const [value, setValue] = useState(0);
  const { setType } = useIncome();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setType("Gelir");
    } else if (newValue === 1) {
      setType("Gider");
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="flex flex-row gap-4">
        <Box className="w-full">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className=" rounded-sm bg-gray-100"
            variant="fullWidth"
          >
            <Tab icon={<AttachMoneySharpIcon />} />
            <Tab icon={<MoneyOffIcon />} />
          </Tabs>

          <Box className="p-8 bg-gray-100 rounded-sm mt-4 shadow">
            {value === 0 && <Income />}
            {value === 1 && <Expense />}
          </Box>
        </Box>

        <Stats />
      </div>
    </div>
  );
}
