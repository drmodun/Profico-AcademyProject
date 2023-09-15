"use client";
import Link from "next/link";
import classes from "./SideMenu.module.scss";

interface SideMenuProps {
  toggleMenu: () => void;
  active: boolean;
  user?: boolean;
}

export const SideMenu = ({ toggleMenu, active, user }: SideMenuProps) => {
  return (
    <div
      className={`${classes.sideMenu} ${active ? classes.active : ""}`}
      onClick={toggleMenu}
    >
      <div
        className={`${classes.sideMenuContent} ${active ? classes.active : ""}`}
        onClick={toggleMenu}
      >
        <div className={classes.links}>
          <Link className={classes.link} href="/">
            Home
          </Link>
          <Link className={classes.link} href={user ? "/me" : "/login"}>
            User Page
          </Link>
          <Link className={classes.link} href="/games">
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
