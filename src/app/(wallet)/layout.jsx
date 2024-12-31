import Header from "@/components/header/header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Montserrat } from "next/font/google";
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
    <html lang="en">
      <body className={`${MontserratFont.variable} antialiased`}>
        <AppRouterCacheProvider>
          <Header />

          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
