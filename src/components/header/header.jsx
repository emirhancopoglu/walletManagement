import { Switch } from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <>
      <main className="container mx-auto">
        <header className="flex flex-row w-full justify-between items-center py-4">
          <div className="text-2xl font-semibold">Wallet Management</div>
          <div className="flex items-center">
            <ul className="flex flex-row gap-8 font-normal">
              <li>Genel</li>
              <li>Gelir</li>
              <li>Gider</li>
              <li>Theme</li>
            </ul>{" "}
            <Switch defaultChecked />
          </div>{" "}
        </header>
      </main>
    </>
  );
}
