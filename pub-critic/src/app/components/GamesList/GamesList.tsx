"use client";
import { Game } from "api/GamesShared";
import classes from "./GamesList.module.scss";
import GameCard from "components/GameCard";
import { useRef, useState, useEffect } from "react";
import { getFilteredGames } from "api/GamesApi";
import { Favourite } from "api/FavouriteApi";
import { getFavourites, getMyFavourites } from "api/FavouriteApi";
import { get } from "http";
import { getMe } from "api/UserApi";
import { Avarage } from "common/interfaces";
import useUser from "utils/UserContext";
import Spinner from "components/LoadingSpinner";

export interface GamesListProps {
  games: Game[];
  avarages?: Avarage[];
  searchParams?: {
    search?: string;
    genre?: number;
    platform?: number;
    metacritic?: string;
    page?: number;
    pageSize?: number;
    ordering?: string;
  };
}
export const GamesList = ({
  avarages,
  games,
  searchParams,
}: GamesListProps) => {
  const list = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams?.page || 1
  );
  const [visibleGames, setVisibleGames] = useState<Game[]>(games);
  const [loading, setLoading] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const { favourites, updateFavourites } = useUser();

  useEffect(() => {
    if (list.current) {
      list.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    setFailed(false);
    setVisibleGames(games);
    setCurrentPage(searchParams?.page || 1);
  }, [
    games,
    searchParams?.search,
    searchParams?.genre,
    searchParams?.platform,
    searchParams?.metacritic,
  ]);

  useEffect(() => {
    if (searchParams?.page) {
      setCurrentPage(searchParams.page);
    }
  }, [searchParams?.page]);

  const fetchMore = async () => {
    if (loading || failed) return;
    setLoading(true);
    const newGames = await getFilteredGames({
      search: searchParams?.search as string,
      genre: searchParams?.genre as number,
      platform: searchParams?.platform as number,
      metacritic: searchParams?.metacritic as string,
      page: Number(currentPage) + 1,
      pageSize: searchParams?.pageSize as number,
      ordering: searchParams?.ordering,
    });
    console.log(newGames);
    if (newGames.results) {
      setVisibleGames((prev) => [...prev, ...newGames.results]);
      setCurrentPage((prev) => Number(prev) + 1);
    }
    if (!newGames.results) {
      setFailed(true);
      console.log("failed");
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
            favourites?.find(
              (favourite: Favourite) => favourite.gameId === game.id
            ) !== undefined
          );
          return (
            <GameCard
              game={game}
              key={game.id}
              avarageRating={
                avarages?.find &&
                avarages?.find((avarage) => avarage.gameId === game.id)?.avarage
              }
              isFavourite={
                favourites &&
                favourites?.find(
                  (favourite: Favourite) => favourite.gameId === game.id
                ) !== undefined
              }
            />
          );
        })}
      </div>
      {loading && <Spinner />}
    </>
  );
};
