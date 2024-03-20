import { PrimeReactProvider } from 'primereact/api';
import { Inter } from "next/font/google";
import "@/app/globals.css";
import AppProvider from "@/app/provider";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ほめるん",
  description: "ほめ特化のSNS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <script
            dangerouslySetInnerHTML={{
              __html: `
                const style = document.createElement('style')
                style.innerHTML = '@layer tailwind-base, primereact, tailwind-utilities;'
                style.setAttribute('type', 'text/css')
                document.querySelector('head').prepend(style)
              `,
            }}
          />
      </head>
      <body className={inter.className + ' bg-slate-400'}>
        <AppProvider>
          <PrimeReactProvider>
              <main className="w-96 sm:w-screen mx-auto bg-slate-200 bg-image-sm bg-cover h-full min-h-screen">
                {children}
              </main>
          </PrimeReactProvider>
        </AppProvider>
      </body>
    </html>
  );
}
