"use client";
import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useTransaction } from "@/context/transaction/transactionContext";
import { formatDate } from "@/utils/date/formatDate";

export default function Income() {
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
    { value: "Maaş", label: "Maaş" },
    { value: "Kripto", label: "Kripto" },
    { value: "Yan Gelir", label: "Yan Gelir" },
    { value: "Diğer", label: "Diğer" },
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
        theme: "light",
        transition: Slide,
      });
      return null;
    }
    const formattedDate = formatDate(date);
    const income = { category, description, amount, date: formattedDate, type };
    addTransaction(income);
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
            Yeni Bir Gelir İşlemi Oluşturun
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
            required
            id="outlined-select"
            select
            label="Kategori"
            variant="outlined"
            size="small"
            className="w-full"
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
        theme="light"
        className={" max-md:px-4 max-md:py-4"}
      />
    </>
  );
}
