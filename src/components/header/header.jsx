import { Switch } from "@mui/material";
import React from "react";
import ThemeChanger from "@/components/theme-changer/themeChanger";

export default function Header() {
  return (
    <>
      <main className="container mx-auto">
        <header className="flex flex-row w-full justify-between items-center py-4">
          <div className="text-2xl font-semibold">Wallet Management</div>
          <div className="flex items-center">
            {/* <Switch defaultChecked /> */}
            <ThemeChanger />
          </div>
        </header>
      </main>
    </>
  );
}
