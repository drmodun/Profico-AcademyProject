"use client";
import classes from "./Navigation.module.scss";
import search from "../../assets/searchIcon.svg";
import Image from "next/image";
import menuIcon from "../../assets/menu-icon.svg";
import { useState } from "react";
import Link from "next/link";
interface NavigationProps {
  name?: string;
  search?: string;
  searchHandler?: (search: string) => void;
  toggleMenu?: () => void;
}
export const Navigation = (props: NavigationProps) => {
  const [searchValue, setSearchValue] = useState<string>(
    props.search ? props.search : ""
  );
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
          src={search}
          alt="search"
          onClick={() => props.searchHandler(search)}
        />
      </div>
      <Link
        href={
          props.name
            ? {
                pathname: "/me",
                query: { name: props.name },
              }
            : "/"
        }
        className={classes.Account}
      >
        <h1>{props.name ? props.name : "Sign In"}</h1>
      </Link>
      <div className={classes.Menu}>
        <div className={classes.ImageContainer} onClick={props.toggleMenu}>
          <Image src={menuIcon} alt="menu" className={classes.MenuIcon}></Image>
        </div>
      </div>
    </div>
  );
};
