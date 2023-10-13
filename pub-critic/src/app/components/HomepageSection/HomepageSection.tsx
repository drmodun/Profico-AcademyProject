"use client";
import { Game } from "common/interfaces";
import classes from "./HomepageSection.module.scss";
import GameCard from "components/GameCard";
import { getFavourites, getMyFavourites } from "api/FavouriteApi";
import { useState, useEffect } from "react";
import { Favourite } from "api/Shared";

interface HomePageSectionProps {
  title: string;
  games: Game[];
}

export const HomePageSection = ({ title, games }: HomePageSectionProps) => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFavourites = async () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setLoading(false);
      setVisibleGames(games);
      return;
    }

    const response = await getMyFavourites();
    if (response) {
      setFavourites(response);
    }
    setLoading(false);
    setVisibleGames(games);
  };

  useEffect(() => {
    setLoading(true);
    fetchFavourites();
  }, [games]);

  return (
    <div className={classes.section}>
      <h1>{title}</h1>
      {visibleGames.length ? (
        <div className={classes.list}>
          {visibleGames.map((game: Game) => (
            <GameCard
              game={game}
              key={game.id}
              isFavourite={
                favourites.find((favourite) => favourite.gameId === game.id) !==
                undefined
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
    </div>
  );
};
