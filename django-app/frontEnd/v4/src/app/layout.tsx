import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies, headers } from 'next/headers';
import { NavBar } from "@/components/navbar";
import { UserProvider } from "@/types/hooks";

import "../css/globals.css";
import "../css/banners.css";
import "../css/cards.css";
import "../css/models.css";
import "../css/dashboard.css";
import "../css/chrome-navbar.css"

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
        <UserProvider>
          <NavBar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
