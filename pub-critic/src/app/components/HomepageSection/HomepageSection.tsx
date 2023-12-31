"use client";
import { Game } from "common/interfaces";
import classes from "./HomepageSection.module.scss";
import GameCard from "components/GameCard";
import { getFavourites, getMyFavourites } from "api/FavouriteApi";
import { useState, useEffect } from "react";
import { Avarage } from "common/interfaces";
import useUser from "utils/UserContext";

interface HomePageSectionProps {
  title: string;
  games: Game[];
  avarages?: Avarage[];
}

export const HomePageSection = ({
  title,
  avarages,
  games,
}: HomePageSectionProps) => {
  const [visibleGames, setVisibleGames] = useState<Game[]>(games);

  const { favourites, loading } = useUser();

  return (
    <section className={classes.section}>
      <h1>{title}</h1>
      {visibleGames.length ? (
        <div className={classes.list}>
          {visibleGames.map((game: Game) => (
            <GameCard
              game={game}
              key={game.id}
              avarageRating={
                avarages?.find((avarage) => avarage.gameId === game.id)?.avarage
              }
              isFavourite={
                favourites?.find(
                  (favourite) => favourite.gameId === game.id
                ) !== undefined
              }
            />
          ))}
        </div>
      ) : (
        <div
          className={classes.notFound} //Before connecting to api
        >
          {loading
            ? "Loading..."
            : "No games found, please try again later or change your search parameters."}
        </div>
      )}
    </section>
  );
};
