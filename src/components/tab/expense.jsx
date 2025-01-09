import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useTransaction } from "@/context/transaction/transactionContext";
import { formatDate } from "@/utils/date/formatDate";
import { useThemeContext } from "@/context/theme/themeContext";
import { useExpenseCategory } from "@/context/category/expenseContext";
import SaveIcon from "@mui/icons-material/Save";

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

  const { categories, addCategory } = useExpenseCategory();
  const [openDialog, setOpenDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");

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

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory({ label: newCategory, value: newCategory.toLowerCase() });
      setCategory(newCategory.toLowerCase());
      setNewCategory("");
      setOpenDialog(false);
    } else {
      toast.warn("Kategori adı boş olamaz.", {
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
    }
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
            <Typography variant="button" style={{ fontWeight: "bold" }}>
              Kaydet
            </Typography>
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
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}

            <Button
              onClick={() => setOpenDialog(true)}
              size="small"
              variant="text"
              className="w-full"
              color="success"
            >
              <Typography variant="button" style={{ fontWeight: "bold" }}>
                Kategori Ekle
              </Typography>
            </Button>
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

      <Dialog
        aria-hidden={openDialog ? "false" : "true"}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Gider Kategorisi Ekle</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            autoFocus
            margin="dense"
            label="Kategori"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="error"
            variant="text"
            onClick={() => setOpenDialog(false)}
          >
            <Typography variant="button" style={{ fontWeight: "bold" }}>
              İptal
            </Typography>
          </Button>
          <Button
            size="small"
            variant="text"
            onClick={handleAddCategory}
            color="primary"
          >
            <Typography variant="button" style={{ fontWeight: "bold" }}>
              Ekle
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
