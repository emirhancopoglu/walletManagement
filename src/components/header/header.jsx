import React from "react";
import ThemeChanger from "@/components/theme-changer/themeChanger";

export default function Header() {
  return (
    <>
      <main className="container mx-auto ">
        <header className="flex flex-row w-full justify-between items-center pt-4 pl-2 pr-2">
          <div className="text-xl">
            <span className="text-green-600 font-normal">WalletManagement</span>
          </div>
          <div className="flex items-center">
            <ThemeChanger />
          </div>
        </header>
      </main>
    </>
  );
}
