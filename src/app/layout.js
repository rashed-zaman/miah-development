import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import HeadScripts from "@/components/HeadScripts";
import Head from "./head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MIAH – Traditional & Innovative Fashion Brand in Bangladesh",
  description: "MIAH is a trusted fashion brand offering traditional & modern clothing. Shop authentic styles for men, women & kids. Visit us now!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Head />
      </head>
      <body>
        <HeadScripts />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
