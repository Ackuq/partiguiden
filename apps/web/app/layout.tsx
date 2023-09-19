import "./global.css";
import { Roboto } from "next/font/google";
import type { PropsWithChildren } from "react";
import Head from "./head";
import Footer from "./footer";
import Header from "./header";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="sv">
      <Head />
      <body
        className={`${roboto.className} bg-background-light dark:bg-background-dark text-font-light dark:text-font-dark flex min-h-screen flex-col shadow-2xl`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
