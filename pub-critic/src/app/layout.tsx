"use client";
import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";
import { Navigation } from "./components/navigation/Navigation";
import Footer from "components/footer";
import { useState, useEffect } from "react";
import SideMenu from "components/sideMenu";
import { getMe } from "api/UserApi";
import { get } from "http";
import { getAccountInfo } from "api/AccountInfo";

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
  const [user, setUser] = useState<any>(null); // TODO: type this
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await getAccountInfo();
    if (response) {
      setUser(response);
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation
          search=""
          name={user?.name}
          searchHandler={searchHandler}
          toggleMenu={toggleMenu}
          menuOpen={menuOpen}
        />
        {children}
        <Footer />
        <SideMenu
          toggleMenu={toggleMenu}
          active={menuOpen}
          user={user !== null}
        />
      </body>
    </html>
  );
}
