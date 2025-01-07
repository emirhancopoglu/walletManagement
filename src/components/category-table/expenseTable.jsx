"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useExpenseCategory } from "@/context/category/expenseContext";

export default function ExpenseTable() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { categories, removeCategory } = useExpenseCategory();

  const handleClickOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const categoryToDelete = categories[selectedIndex];
      removeCategory(categoryToDelete.value); // Value gönderiliyor
      setOpen(false);
    }
  };

  return (
    <>
      <TableContainer
        sx={{
          width: { xs: "100%", sm: "100%", md: "50%" },
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: "50%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Gider Kategori</StyledTableCell>
              <StyledTableCell align="right">Kategoriyi Sil</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories && categories.length > 0 ? (
              <>
                {categories.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {item.label}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        onClick={() => handleClickOpen(index)}
                        aria-label="delete"
                        color="info"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </>
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={2} align="center">
                  Veri bulunamadı.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Kategoriyi Sil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>
              {selectedIndex !== null && categories[selectedIndex]?.label}
            </span>
            {""} adlı kategoriyi silmek istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            size="small"
            color="info"
            variant="outlined"
          >
            İptal
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            size="small"
            autoFocus
            variant="outlined"
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
