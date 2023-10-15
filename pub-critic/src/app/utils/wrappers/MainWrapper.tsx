"use client";

import { SideMenuProvider } from "utils/SideMenuContext";
import useUser, { UserProvider } from "utils/UserContext";

interface MainWrapperProps {
  children: React.ReactNode;
}

export const MainWrapper = ({ children } : MainWrapperProps) => {
  return (
    <SideMenuProvider>
      <UserProvider>{children}</UserProvider>
    </SideMenuProvider>
  );
};
