"use client";
import classes from "./Navigation.module.scss";
import searchImage from "assets/searchIcon.svg";
import Image from "next/image";
import menuIcon from "assets/menu-icon.svg";
import { useState } from "react";
import Link from "next/link";
import Hamburger from "components/hamburger";

interface NavigationProps {
  name?: string;
  search?: string;
  menuOpen: boolean;
  searchHandler: (search: string) => void;
  toggleMenu: () => void;
}

export const Navigation = ({
  searchHandler,
  toggleMenu,
  search,
  menuOpen,
  name,
}: NavigationProps) => {
  const [searchValue, setSearchValue] = useState<string>(search ? search : "");
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
          <Image
            src={searchImage}
            alt="search"
            onClick={() => search && searchHandler(search)}
          />
        </Link>
      </div>
      <Link
        href={
          name
            ? {
                pathname: "/me",
                query: { name: name },
              }
            : "/"
        }
        className={classes.account}
      >
        <h1>{name ? name : "Sign In"}</h1>
      </Link>
      <div className={classes.menu}>
        <Hamburger open={menuOpen} onToggle={toggleMenu} />
      </div>
    </div>
  );
};
