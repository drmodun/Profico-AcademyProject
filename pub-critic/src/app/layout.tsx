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
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    const token = localStorage.getItem("jwtToken");
    const time = localStorage.getItem("time");
    if (!token || new Date(time).getTime() < Date.now() - 1000 * 60 * 60 * 8) {
      return;
    }

    const user = await getMe();
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [children]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <SideMenu toggleMenu={toggleMenu} active={menuOpen} />
      </body>
    </html>
  );
}
