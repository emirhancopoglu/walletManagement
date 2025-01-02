"use client";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Chart from "@/components/chart/chart";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTransaction } from "@/context/transaction/transactionContext";

export default function TransactionTable() {
  const { transactionData, formatCurrency, deleteTransaction } =
    useTransaction();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

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

  function createData(
    category,
    comment,
    amount,
    transactionDate,
    transactionRemove
  ) {
    return {
      category,
      comment,
      amount,
      transactionDate,
      transactionRemove,
    };
  }

  const rows = [
    createData(
      "Yemek",
      "McDonalds'tan hamburger alışverişi yaptım.",
      60,
      "31.12.2024",
      4.0
    ),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const handleClickOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      deleteTransaction(selectedIndex);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-4 max-xl:p-2 flex flex-row  gap-4 max-md:flex-col ">
        <TableContainer
          component={Paper}
          sx={{
            width: { xs: "100%", sm: "100%", md: "50%" },
          }}
          className="rounded-full max-md:w-full"
        >
          <Table aria-label="customized table" className="max-md:w-full">
            <TableHead>
              <TableRow>
                <StyledTableCell>Kategori</StyledTableCell>
                <StyledTableCell align="left">Açıklama</StyledTableCell>
                <StyledTableCell align="center">Tutar</StyledTableCell>
                <StyledTableCell align="center">İşlem Türü</StyledTableCell>
                <StyledTableCell align="center">Tarih</StyledTableCell>

                <StyledTableCell align="center">Sil</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData && transactionData.length > 0 ? (
                <>
                  {transactionData.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {item.category}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item.description}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {formatCurrency(item.amount)}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        {item.type === "Gelir" ? (
                          <>
                            <div className="w-full bg-green-200 font-semibold text-green-500 rounded-full max-md:px-4">
                              {item.type}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-full bg-red-200 font-semibold text-red-500 rounded-full">
                              {item.type}
                            </div>
                          </>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          onClick={() => handleClickOpen(index)}
                          aria-label="delete"
                          color="info"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={5} align="center">
                    Veri bulunamadı.
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Chart />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Silme İşlemi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu işlemi silmek istediğinizden emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info" variant="outlined">
            İptal
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
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
