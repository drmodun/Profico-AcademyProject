"use client";
import classes from "./Navigation.module.scss";
import searchImage from "assets/searchIcon.svg";
import Image from "next/image";
import menuIcon from "assets/menu-icon.svg";
import { useState } from "react";
import Link from "next/link";
import Hamburger from "components/hamburger/Hamburger";

interface NavigationProps {
  name?: string;
  search?: string;
  menuOpen: boolean;
  searchHandler: (search: string) => void;
  toggleMenu?: () => void;
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
    <div className={classes.Navigation}>
      <Link href="/" className={classes.Name}>
        <h1>Pub Critic</h1>
      </Link>
      <div className={classes.Search}>
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
        <Image
          src={searchImage}
          alt="search"
          onClick={() => searchHandler(search)}
        />
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
        className={classes.Account}
      >
        <h1>{name ? name : "Sign In"}</h1>
      </Link>
      <div className={classes.Menu}>
          <Hamburger open={menuOpen} onToggle={toggleMenu} />
      </div>
    </div>
  );
};
