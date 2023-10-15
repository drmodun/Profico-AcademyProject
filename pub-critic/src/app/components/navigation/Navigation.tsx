"use client";
import classes from "./Navigation.module.scss";
import searchImage from "assets/searchIcon.svg";
import Image from "next/image";
import menuIcon from "assets/menu-icon.svg";
import { useState } from "react";
import Link from "next/link";
import Hamburger from "components/hamburger";
import useUser from "utils/UserContext";
import useSideMenu from "utils/SideMenuContext";

export const Navigation = ({ params }: any) => {
  const { user, loading } = useUser();
  const { active, toggleActive } = useSideMenu();
  const [searchValue, setSearchValue] = useState<string>(
    params?.search ? params.search : ""
  );

  const toggleMenu = () => {
    toggleActive();
  };
  return (
    <div className={classes.navigation}>
      <Link href="/" className={classes.name}>
        <h1>Pub Critic</h1>
      </Link>
      <div className={classes.search}>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
        <Link
          href={{
            pathname: "/games",
            query: {
              search: searchValue,
              page: 1,
              pageSize: 10,
              platform: undefined,
              genre: undefined,
              metacritic: "0,100",
              ordering: "",
            },
          }}
        >
          <Image src={searchImage} alt="search" />
        </Link>
      </div>
      <Link
        href={
          user
            ? {
                pathname: "/me",
                query: { name: user.name, id: user.id },
              }
            : "/login"
        }
        className={classes.account}
      >
        <h1>{user ? user.name : loading ? "Loading..." : "Sign In"}</h1>
      </Link>
      <div className={classes.menu}>
        <Hamburger open={active} onToggle={toggleMenu} />
      </div>
    </div>
  );
};
