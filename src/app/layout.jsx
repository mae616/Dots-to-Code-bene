import { PrimeReactProvider } from 'primereact/api';
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import AppProvider from "@/app/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ほめるん",
  description: "ほめ特化のSNS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={inter.className + ' bg-slate-400'}>
        <AppProvider>
          <PrimeReactProvider>
            <main className="w-96 mx-auto bg-slate-200 h-screen">
              {children}
            </main>
          </PrimeReactProvider>
        </AppProvider>
      </body>
    </html>
  );
}
