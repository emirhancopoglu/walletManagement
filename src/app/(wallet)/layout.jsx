import Header from "@/components/header/header";
import { ThemeProvider } from "next-themes";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeSwitchProvider } from "@/context/theme/themeContext";
import { TransactionProvider } from "@/context/transaction/transactionContext";
import { ToastContainer } from "react-toastify";
import { Montserrat } from "next/font/google";
import { IncomeCategoryProvider } from "@/context/category/incomeContext";
import { ExpenseCategoryProvider } from "@/context/category/expenseContext";
import "@/app/globals.css";

const MontserratFont = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-Montserrat",
});

export const metadata = {
  title: "Wallet Management",
  description: "Wallet Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${MontserratFont.variable} antialiased `}>
        <AppRouterCacheProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <ThemeSwitchProvider>
              <TransactionProvider>
                <IncomeCategoryProvider>
                  <ExpenseCategoryProvider>
                    <Header />
                    <ToastContainer />
                    {children}
                    {/* <Footer /> */}
                  </ExpenseCategoryProvider>
                </IncomeCategoryProvider>
              </TransactionProvider>
            </ThemeSwitchProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
