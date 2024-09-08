import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies, headers } from 'next/headers';
import {NavBar} from "@/components/navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Contact Card",
  description: "Digitise your business cards",
};

export default function RootLayout({ children, }:
  Readonly<{ children: React.ReactNode; }>) {
  const sessionStatus = headers().get('sessionid');
  // console.log("🚀 ~ sessionStatus:", sessionStatus)
  const sessionCookie = cookies().get('sessionid');
  // console.log("🚀 ~ sessionCookie:", sessionCookie)


  return (
    <html lang="en">
      <body className="root-container">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
