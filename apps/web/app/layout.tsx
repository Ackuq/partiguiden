import "./global.css";
import { Roboto } from "next/font/google";
import type { PropsWithChildren } from "react";
import Head from "./head";
import Footer from "./footer";
import Header from "@components/header/header";
import { ThemeProvider } from "@components/providers/theme-provider";
import { twMerge } from "tailwind-merge";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <Head />
      <body
        className={twMerge(
          roboto.className,
          "flex min-h-screen flex-col bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50",
        )}
      >
        <ThemeProvider attribute="class">
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
