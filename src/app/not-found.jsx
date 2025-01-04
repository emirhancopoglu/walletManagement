"use client";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Custom404() {
  return (
    <div className="w-full justify-center items-center flex flex-col h-screen">
      <p className="font-bold text-red-500">404</p>
      <p className="text-4xl font-semibold">Sayfa Bulunamadı!</p>
      <p className="text-sm font-normal text-gray-500 pb-2 text-center  ">
        Üzgünüm aradığınız sayfa mevcut değil.
      </p>
      <Button
        variant="outlined"
        size="small"
        href="/"
        startIcon={<ArrowBackIcon />}
      >
        Geri Dön
      </Button>
    </div>
  );
}
