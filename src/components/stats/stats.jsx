import React from "react";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import MoneyOffCsredRoundedIcon from "@mui/icons-material/MoneyOffCsredRounded";
import WalletIcon from "@mui/icons-material/Wallet";
import { GiMoneyStack } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { MdMoneyOff } from "react-icons/md";
import { useTransaction } from "@/context/income/transactionContext";

export default function Stats() {
  const { formattedIncomeTotal, formattedExpenseTotal, formattedBalance } =
    useTransaction();

  return (
    <>
      <div className="flex flex-col w-full gap-4 max-md:gap-2">
        <div className="flex flex-row w-full gap-2 max-md:flex-col">
          <div className="rounded-sm shadow w-full h-max bg-gray-100 px-4 py-4 flex flex-row items-center gap-4">
            <div className="rounded-full  bg-gray-200">
              <MdAttachMoney size={50} className="text-green-500 " />
            </div>

            <div className="flex flex-col">
              <p className="text-gray-500 font-normal text-xl">Gelir</p>
              <p className="font-semibold">{formattedIncomeTotal} </p>
            </div>
          </div>
          <div className="rounded-sm shadow w-full h-max bg-gray-100 px-4 py-4 flex flex-row items-center gap-4">
            <div className="rounded-full  bg-gray-200">
              <MdMoneyOff size={50} className="text-red-500" />
            </div>

            <div className="flex flex-col">
              <p className="text-gray-500 font-normal text-xl">Gider</p>
              <p className="font-semibold">{formattedExpenseTotal}</p>
            </div>
          </div>
        </div>
        <div className="rounded-sm shadow w-full h-full bg-gray-100 px-4 py-4 flex flex-row items-center gap-4">
          <div className="rounded-full  bg-gray-200">
            <GiMoneyStack size={50} className="text-green-500" />
          </div>

          <div className="flex flex-col">
            <p className="text-gray-500 font-normal text-xl">Toplam Bakiye</p>
            <p className="font-semibold">{formattedBalance}</p>
          </div>
        </div>
      </div>
    </>
  );
}
