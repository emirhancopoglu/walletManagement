import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useTransaction } from "@/context/transaction/transactionContext";
import { formatDate } from "@/utils/date/formatDate";
import { useThemeContext } from "@/context/theme/themeContext";

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
  const { theme } = useThemeContext();

  const categories = [
    { value: "Yemek", label: "Yemek" },
    { value: "Giyim", label: "Giyim" },
    { value: "Teknoloji", label: "Teknoloji" },
  ];

  const handleSave = () => {
    if (!category || !amount || !date) {
      toast.warn("Boş bırakılan alanları doldurun.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: false,
        draggable: true,
        pauseOnHover: true,
        theme: theme === "dark" ? "dark" : "light",
        transition: Slide,
      });
      return null;
    }
    const formattedDate = formatDate(date);
    const expense = {
      category,
      description,
      amount,
      date: formattedDate,
      type: "Gider",
    };
    addTransaction(expense);
    setCategory("");
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between pb-4 items-center">
          <p className="font-semibold text-sm">
            Yeni Bir <span className="text-red-500 font-bold">Gider</span>{" "}
            İşlemi Oluşturun
          </p>
          <Button
            color="info"
            size="small"
            variant="outlined"
            endIcon={<SaveIcon />}
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={2}
      />
    </>
  );
}
