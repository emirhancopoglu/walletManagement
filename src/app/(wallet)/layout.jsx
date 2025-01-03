import { ThemeProvider } from "next-themes";
import { Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { TransactionProvider } from "@/context/transaction/transactionContext";
import Header from "@/components/header/header";
import { ThemeSwitchProvider } from "@/context/theme/themeContext";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/footer/footer";

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
      <body className={`${MontserratFont.variable} antialiased`}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <ThemeSwitchProvider>
              <TransactionProvider>
                <Header />
                <ToastContainer />
                {children}
                <Footer />
              </TransactionProvider>
            </ThemeSwitchProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
