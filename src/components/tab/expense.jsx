import { Button, MenuItem, TextField } from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useTransaction } from "@/context/income/transactionContext";

export default function Expense() {
  const {
    addTransaction,
    category,
    setCategory,
    description,
    setDescription,
    amount,
    setAmount,
    date,
    setDate,
    type,
  } = useTransaction();

  const categories = [
    { value: "Yemek", label: "Yemek" },
    { value: "Giyim", label: "Giyim" },
    { value: "Teknoloji", label: "Teknoloji" },
  ];

  const handleSave = () => {
    const expense = { category, description, amount, date, type: "Gider" };
    addTransaction(expense);
    setCategory("");
    setDescription("");
    setAmount("");
    setDate("");
  };

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
          onClick={handleSave}
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((option) => (
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          type="date"
          required
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    </div>
  );
}
