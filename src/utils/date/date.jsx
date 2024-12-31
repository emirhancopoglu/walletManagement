"use client";
import React, { useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useIncome } from "@/context/income/incomeContext";

export default function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { date, setDate } = useIncome();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Tarih"
        value={selectedDate}
        onChange={
          ((newValue) => setSelectedDate(newValue),
          (e) => setDate(e.target.value))
        }
        slotProps={{ textField: { size: "small" } }}
        className="w-full"
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}
