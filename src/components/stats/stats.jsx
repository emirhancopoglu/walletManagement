import React from "react";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import MoneyOffCsredRoundedIcon from "@mui/icons-material/MoneyOffCsredRounded";
import WalletIcon from "@mui/icons-material/Wallet";
import { GiMoneyStack } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { MdMoneyOff } from "react-icons/md";
import { useIncome } from "@/context/income/incomeContext";

export default function Stats() {
  const { formattedTotalAmount } = useIncome();

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row w-full gap-2">
          <div className="rounded-sm shadow w-full h-max bg-gray-100 px-4 py-4 flex flex-row items-center gap-4">
            <div className="rounded-full  bg-gray-200">
              <MdAttachMoney size={50} className="text-green-500 " />
            </div>

            <div className="flex flex-col">
              <p className="text-gray-500 font-normal text-xl">Gelir</p>
              <p className="font-semibold">{formattedTotalAmount} </p>
            </div>
          </div>
          <div className="rounded-sm shadow w-full h-max bg-gray-100 px-4 py-4 flex flex-row items-center gap-4">
            <div className="rounded-full  bg-gray-200">
              <MdMoneyOff size={50} className="text-red-500" />
            </div>

            <div className="flex flex-col">
              <p className="text-gray-500 font-normal text-xl">Gider</p>
              <p className="font-semibold">200₺</p>
            </div>
          </div>
        </div>
        <div className="rounded-sm shadow w-full h-full bg-gray-100 px-4 py-4 flex flex-row items-center gap-4">
          <div className="rounded-full  bg-gray-200">
            <GiMoneyStack size={50} className="text-green-500" />
          </div>

          <div className="flex flex-col">
            <p className="text-gray-500 font-normal text-xl">Toplam Bakiye</p>
            <p className="font-semibold">200₺</p>
          </div>
        </div>
      </div>
    </>
  );
}
