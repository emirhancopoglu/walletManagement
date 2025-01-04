import "@/app/globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { Montserrat } from "next/font/google";

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
        {children}
      </body>
    </html>
  );
}
