import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/app/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ほめるん",
  description: "ほめ特化のSNS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className + ' bg-slate-400'}><AppProvider>{children}</AppProvider></body>
    </html>
  );
}
