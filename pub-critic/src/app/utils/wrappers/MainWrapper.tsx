"use client";

import { SideMenuProvider } from "utils/SideMenuContext";
import useUser, { UserProvider } from "utils/UserContext";

export const MainWrapper = ({ children }) => {
  return (
    <SideMenuProvider>
      <UserProvider>{children}</UserProvider>
    </SideMenuProvider>
  );
};
