"use client";
import Link from "next/link";
import classes from "./SideMenu.module.scss";
interface SideMenuProps {
  toggleMenu: () => void;
  active: boolean;
}
export const SideMenu = (props: SideMenuProps) => {
  return (
    <div className={classes.SideMenu}>
      <div
        className={`${classes.SideMenuContent} ${
          props.active ? classes.Active : ""
        }`}
      >
        <div className={classes.Links}>
          <Link className={classes.Link} href="/">
            Home
          </Link>
          <Link className={classes.Link} href="/me">
            User Page
          </Link>
          <Link className={classes.Link} href="/">
            Games Page
          </Link>
        </div>
      </div>
      <div
        className={`${classes.Backdrop} ${props.active ? classes.Active : ""}`}
        onClick={props.toggleMenu}
      ></div>
    </div>
  );
};
