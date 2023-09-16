"use client";
import heart from "assets/favourite.svg";
import classes from "./Favourite.module.scss";
import heartActive from "assets/favourite-active.svg";
import Image from "next/image";
import { useState } from "react";
import { Genre } from "api/GamesShared";
import { deleteFavourite, postFavourite } from "api/FavouriteApi";

interface FavouriteProps {
  initActive: boolean;
  id: number;
  genres: Genre[] | undefined;
}

export const Favourite = ({ initActive, id, genres = [] }: FavouriteProps) => {
  const [active, setActive] = useState<boolean>(initActive);

  const handleToggleFavourite = () => {
    setActive((prev) => !prev);
    const favourite = {
      gameId: id,
      genres: genres.map((genre: Genre) => genre.name) || [],
    };

    if (active) {
      const deletion = deleteFavourite(favourite.gameId);
      return deletion;
    }

    const add = postFavourite(favourite);
    return add;
  };

  return (
    <div className={classes.container}>
      <div className={classes.favourite}>
        <Image
          src={active ? heartActive : heart}
          alt="favourite"
          onClick={handleToggleFavourite}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};
