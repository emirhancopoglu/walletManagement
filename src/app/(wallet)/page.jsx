"use client";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Income from "@/components/tab/income";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import Expense from "@/components/tab/expense";
import Stats from "@/components/stats/stats";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="container mx-auto mt-4">
        <div className="flex flex-row gap-4">
          <Box className="w-full">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="rounded-lg bg-gray-100"
              variant="fullWidth"
            >
              <Tab icon={<AttachMoneySharpIcon />} />
              <Tab icon={<MoneyOffIcon />} />
            </Tabs>

            <Box className="p-8 bg-gray-100 rounded-lg mt-4 shadow">
              {value === 0 && <Income />}
              {value === 1 && <Expense />}
            </Box>
          </Box>

          <Stats />
        </div>
      </div>
    </>
  );
}
