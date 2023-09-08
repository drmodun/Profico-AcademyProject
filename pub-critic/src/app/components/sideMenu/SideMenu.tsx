"use client";
import Link from "next/link";
import classes from "./SideMenu.module.scss";

interface SideMenuProps {
  toggleMenu: () => void;
  active: boolean;
}

export const SideMenu = ({ toggleMenu, active }: SideMenuProps) => {
  return (
    <div className={`${classes.sideMenu} ${active ? classes.active : ""}`}>
      <div
        className={`${classes.sideMenuContent} ${active ? classes.active : ""}`}
      >
        <div className={classes.links}>
          <Link className={classes.link} href="/">
            Home
          </Link>
          <Link className={classes.link} href="/me">
            User Page
          </Link>
          <Link className={classes.link} href="/">
            Games Page
          </Link>
        </div>
      </div>
      <div
        className={`${classes.backdrop} ${active ? classes.active : ""}`}
        onClick={toggleMenu}
      ></div>
    </div>
  );
};
