"use client";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { WidthFull } from "@mui/icons-material";

export default function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Tarih"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        slotProps={{ textField: { size: "small" } }}
        className="w-full"
      />
    </LocalizationProvider>
  );
}
