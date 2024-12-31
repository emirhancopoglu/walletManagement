"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TransactionTable() {
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

  return (
    <>
      <div className="container mx-auto mt-4 ">
        <TableContainer
          component={Paper}
          sx={{ width: "50%", minWidth: 700, borderRadius: "0.5rem" }}
          className="rounded-full"
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Kategori</StyledTableCell>
                <StyledTableCell align="left">Açıklama</StyledTableCell>
                <StyledTableCell align="center">Tutar</StyledTableCell>
                <StyledTableCell align="center">Tarih</StyledTableCell>
                <StyledTableCell align="center">Sil</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.category}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.comment}</StyledTableCell>
                  <StyledTableCell align="center">{row.amount}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.transactionDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.transactionRemove}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
