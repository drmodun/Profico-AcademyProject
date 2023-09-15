"use client";
import { Game } from "api/GamesShared";
import classes from "./GamesList.module.scss";
import GameCard from "components/GameCard";
import { useRef, useState, useEffect } from "react";
import { getFilteredGames } from "api/GamesApi";
import { Favourite } from "api/Shared";
import { getFavourites } from "api/FavouriteApi";
import { get } from "http";
import { getMe } from "api/UserApi";

export interface GamesListProps {
  games: Game[];
  searchParams?: {
    search?: string;
    genre?: number;
    platform?: number;
    metacritic?: string;
    page?: number;
    pageSize?: number;
  };
}
export const GamesList = ({ games, searchParams }: GamesListProps) => {
  const list = useRef<HTMLDivElement>(null);
  const [favourites, setFavourites] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams?.page || 1
  );
  const [visibleGames, setVisibleGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFavourites = async () => {
    const user = await getMe();
    if (!user) {
      setVisibleGames(games);
    }
    const response = await getFavourites(user?.id);
    console.log(response);
    if (response) {
      setFavourites(response);
      setVisibleGames(games);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [games]);

  useEffect(() => {
    if (list.current) {
      list.current.scrollIntoView({ behavior: "smooth" });
    }
    fetchFavourites();
  }, []);

  const fetchMore = async () => {
    if (loading) return;
    setLoading(true);
    const newGames = await getFilteredGames({
      search: searchParams?.search as string,
      genre: searchParams?.genre as number,
      platform: searchParams?.platform as number,
      metacritic: searchParams?.metacritic as string,
      page: currentPage + 1,
      pageSize: searchParams?.pageSize as number,
    });
    if (newGames.results) {
      setVisibleGames((prev) => [...prev, ...newGames.results]);
      setCurrentPage((prev) => prev + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchMore();
    }
  };

  return (
    <>
      <div className={classes.gamesList} ref={list} id="#list">
        {visibleGames.map((game: Game) => {
          console.log(
            favourites?.find((favourite) => favourite.gameId === game.id) !==
              undefined
          );
          return (
            <GameCard
              game={game}
              key={game.id}
              isFavourite={
                favourites?.find(
                  (favourite) => favourite.gameId === game.id
                ) !== undefined
              }
            />
          );
        })}
      </div>
      {loading && <div className={classes.loading}>Loading...</div>}
    </>
  );
};
