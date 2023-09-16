"use client";

import { Screenshots } from "components/Screenshots/Screenshots";
import classes from "./GameInfo.module.scss";
import { Genre, Platform, PlatformFull, Screenshot } from "api/GamesShared";
import Image from "next/image";
import contoller from "assets/controller.svg";
import { useEffect, useState } from "react";
import { deleteFavourite, getFavourite, postFavourite } from "api/FavouriteApi";
import { getFilteredGames } from "api/GamesApi";
interface GameInfoProps {
  name: string;
  description: string;
  metacritic: number;
  rating: number;
  released: string;
  background_image: string;
  screenshots: Screenshot[];
  platforms: PlatformFull[];
  website: string;
  id: number;
  metacritic_url: string;
}

export const GameInfo = ({
  name,
  description,
  metacritic,
  rating,
  background_image,
  platforms,
  released,
  website,
  id,
  metacritic_url,
  screenshots,
}: GameInfoProps) => {
  console.log(screenshots);

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const checkFavourite = async () => {
    const favourite = await getFavourite(id);
    setIsFavourite(favourite);
  };

  const handleToggleFavourite = async () => {
    setIsFavourite((prev) => !prev);
    if (isFavourite) {
      await deleteFavourite(id);
      return;
    }

    //probably wont have 100% match but I need it to add genres, not the most important
    const matches = await getFilteredGames({
      page: 1,
      pageSize: 1,
      search: name,
      metacritic: metacritic.toString(),
      ordering: "metacritic",
    });
    const genres = matches.results[0].genres.map((genre: Genre) => genre.name);
    const newFavourite = {
      gameId: id,
      genres: genres,
    };
    await postFavourite(newFavourite);
  };

  useEffect(() => {
    checkFavourite();
  }, []);

  useEffect(() => {
    checkFavourite();
  }, [id]);

  return (
    <div className={classes.container}>
      <h2>{name}</h2>
      <div className={classes.game}>
        <Screenshots screenshots={screenshots} />
        <div className={classes.info}>
          <div className={classes.image}>
            <Image
              src={background_image ? background_image : contoller}
              alt="game"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={classes.platforms}>
            {platforms.map((platform) => (
              <div className={classes.platform} key={platform.platform.id}>
                {platform.platform.name}
              </div>
            ))}
          </div>
          <div className={classes.released}>
            <span>Released: {released} </span>
          </div>
          <div className={classes.buttons}>
            <a href={website} className={classes.link}>
              <button className={classes.visit}>Visit Website</button>
            </a>
            <a href={"#"} className={classes.link}>
              <button
                className={isFavourite ? classes.visit : classes.favourite}
                onClick={handleToggleFavourite}
              >
                {isFavourite ? "Remove from favourites" : "Add to favourites"}
              </button>
            </a>
            <a href={"#"} className={classes.link}>
              <button className={classes.review}>Leave a review</button>
            </a>
          </div>
          <div className={classes.ratings}>
            <div className={classes.rating}>
              <span className={classes.ratingTitle}>Source: </span>
              <span className={classes.ratingValue}>{rating}</span>
            </div>
            <div className={classes.rating}>
              <a href={metacritic_url} className={classes.ratingTitle}>
                Metacritic:{" "}
              </a>
              <span className={classes.ratingValue}>{metacritic}</span>
            </div>
            <div className={classes.rating}>
              <span className={classes.ratingTitle}>Pub: </span>
              <span className={classes.ratingValue}>TODO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
