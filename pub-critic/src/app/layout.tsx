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
import { MainWrapper } from "utils/wrappers/MainWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainWrapper>
          <Navigation />
          {children}
          <Footer />
          <SideMenu />
        </MainWrapper>
      </body>
    </html>
  );
}
