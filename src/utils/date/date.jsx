"use client";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useIncome } from "@/context/income/transactionContext";

export default function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { date, setDate } = useIncome();

  const handleDateChange = (newValue) => {
    const newDate = dayjs(newValue); // newValue'yu dayjs nesnesine çeviriyoruz
    setSelectedDate(newDate);
    setDate(newDate); // selectedDate'i context'teki date'e atıyoruz
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Tarih"
        value={selectedDate}
        onChange={handleDateChange}
        slotProps={{ textField: { size: "small" } }}
        className="w-full"
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}
