import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TProvider } from "@/providers/toast-provider";

import Navbar from "../components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <TProvider />
        <Navbar currentUser={user} />
        {children}
      </body>
    </html>
  );
}
