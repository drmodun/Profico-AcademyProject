"use client";
import Link from "next/link";
import classes from "./SideMenu.module.scss";
import useSideMenu from "utils/SideMenuContext";
import useUser from "utils/UserContext";

export const SideMenu = () => {
  const { active, toggleActive } = useSideMenu();
  const { user } = useUser();
  return (
    <div className={`${classes.sideMenu} ${active ? classes.active : ""}`}>
      <div
        className={`${classes.sideMenuContent} ${active ? classes.active : ""}`}
      >
        <div className={classes.links} onClick={toggleActive}>
          <Link className={classes.link} href="/">
            Home
          </Link>
          <Link
            className={classes.link}
            href={
              user
                ? { pathname: "/me", auth: localStorage.getItem("jwtToken") }
                : "/login"
            }
          >
            User Page
          </Link>
          <Link className={classes.link} href="/games">
            Games Page
          </Link>
        </div>
      </div>
      <div
        className={`${classes.backdrop} ${active ? classes.active : ""}`}
        onClick={toggleActive}
      ></div>
    </div>
  );
};
