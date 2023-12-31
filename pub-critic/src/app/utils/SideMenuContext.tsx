"use client";

import { getMyFavourites } from "api/FavouriteApi";
import { getLikesAndDislikes } from "api/LikesAndDislikesApi";

import { User } from "common/interfaces";
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface SideMenuContextProps {
  active: boolean;
  toggleActive: () => void;
}

const defaultSideMenuContext: SideMenuContextProps = {
  active: false,
  toggleActive: () => {},
};

export const SideMenuContext = createContext<SideMenuContextProps>(
  defaultSideMenuContext
);

export const SideMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [active, setActive] = useState<boolean>(false);

  const toggleActive = () => {
    console.log(active);
    setActive((prev) => !prev);
  };

  return (
    <SideMenuContext.Provider
      value={
        {
          active,
          toggleActive,
        } as SideMenuContextProps
      }
    >
      {children}
    </SideMenuContext.Provider>
  );
};

const useSideMenu = () => useContext(SideMenuContext);
export default useSideMenu;
