import React from "react";
import { GiMoneyStack } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { MdMoneyOff } from "react-icons/md";
import { useTransaction } from "@/context/transaction/transactionContext";
import { useThemeContext } from "@/context/theme/themeContext";
import AnimatedNumber from "@/utils/number-counter/numberAnimation";

export default function Stats() {
  const { formattedIncomeTotal, formattedExpenseTotal, formattedBalance } =
    useTransaction();
  const { theme } = useThemeContext();

  return (
    <>
      <div className="flex flex-col w-full gap-4 max-md:gap-2">
        <div className="flex flex-row w-full gap-2 max-md:flex-col">
          <div
            className={`rounded-sm shadow w-full h-max px-4 py-4 flex flex-row items-center gap-4 border dark:border dark:border-gray-600 dark:bg-[#121212]`}
          >
            <MdAttachMoney size={50} className="text-green-500 " />

            <div className="flex flex-col">
              <p className="text-gray-500 font-normal text-xl dark:text-gray-200">
                Gelir
              </p>
              <div className="font-semibold max-lg:text-sm">
                <AnimatedNumber value={formattedIncomeTotal} />
              </div>
            </div>
          </div>
          <div
            className={`rounded-sm shadow w-full h-max px-4 py-4 flex flex-row items-center gap-4 border dark:border dark:border-gray-600 dark:bg-[#121212]`}
          >
            <MdMoneyOff size={50} className="text-red-500" />

            <div className="flex flex-col">
              <p className="text-gray-500 font-normal text-xl dark:text-gray-200">
                Gider
              </p>
              <div className="font-semibold max-lg:text-sm">
                <AnimatedNumber value={formattedExpenseTotal} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`rounded-sm shadow w-full h-full  px-4 py-4 flex flex-row items-center gap-4 border dark:border dark:border-gray-600 dark:bg-[#121212]`}
        >
          <GiMoneyStack size={50} className="text-green-500" />

          <div className="flex flex-col">
            <p className="text-gray-500 font-normal text-xl dark:text-gray-200">
              Toplam Bakiye
            </p>
            <div className="font-semibold max-lg:text-sm">
              <AnimatedNumber value={formattedBalance} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
