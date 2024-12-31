import DateSelector from "@/utils/date/date";
import { Button, MenuItem, TextField } from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";

export default function Expense() {
  const currencies = [
    {
      value: "USD",
      label: "Yiyecek",
    },
    {
      value: "EUR",
      label: "Giyecek",
    },
    {
      value: "BTC",
      label: "Market Alışverişi",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between pb-4 items-center">
        <p className="font-semibold">Yeni Bir Gider İşlemi Oluşturun</p>
        <Button
          color="#FFFDF0"
          size="small"
          variant="outlined"
          endIcon={<SaveIcon />}
          className="font-semibold capitalize"
        >
          Kaydet
        </Button>
      </div>

      <div className="flex flex-row gap-4 pb-4">
        <TextField
          id="outlined-select"
          select
          label="Kategori"
          variant="outlined"
          size="small"
          className="w-full"
          required
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-basic"
          label="Açıklama"
          variant="outlined"
          size="small"
          fullWidth
        />
      </div>
      <div className="flex flex-row gap-4">
        <TextField
          id="outlined-basic"
          label="Tutar"
          variant="outlined"
          size="small"
          type="number"
          required
          fullWidth
        />
        <DateSelector />
      </div>
    </div>
  );
}
