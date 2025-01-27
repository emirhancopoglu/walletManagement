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
import { useTransaction } from "@/context/transaction/transactionContext";
import { useThemeContext } from "@/context/theme/themeContext";

export default function Transaction() {
  const [value, setValue] = useState(0);
  const { setType } = useTransaction();
  const { theme } = useThemeContext();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setType("Gelir");
    } else if (newValue === 1) {
      setType("Gider");
    }
  };

  return (
    <div className="container mx-auto mt-4 max-xl:px-2 ">
      <div className="flex flex-row gap-4 max-md:flex-col">
        <Box className="w-full">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className={`rounded-sm border dark:border-gray-600`}
            variant="fullWidth"
          >
            <Tab icon={<AttachMoneySharpIcon />} />
            <Tab icon={<MoneyOffIcon />} />
          </Tabs>

          <Box
            className={`p-8 border rounded-sm mt-4 shadow max-lg:p-2 dark:border-gray-600`}
          >
            {value === 0 && <Income />}
            {value === 1 && <Expense />}
          </Box>
        </Box>

        <Stats />
      </div>
    </div>
  );
}
