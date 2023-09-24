"use client";
import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";
import { Navigation } from "./components/navigation/Navigation";
import Footer from "components/Footer";
import { useState } from "react";
import SideMenu from "components/sideMenu";

const inter = Inter({ subsets: ["latin"] });

function searchHandler(search: string) {
  "use client";
  console.log(search);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  "use client";
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation
          search=""
          searchHandler={searchHandler}
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
        />
        {children}
        <Footer />
        <SideMenu toggleMenu={toggleMenu} active={menuOpen} />
      </body>
    </html>
  );
}
