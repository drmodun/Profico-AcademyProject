"use client";
import { Game } from "common/interfaces";
import classes from "./GamesList.module.scss";
import GameCard from "components/GameCard";
import { useRef, useState, useEffect } from "react";
import { getFilteredGames } from "api/GamesApi";

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
export const GamesList: React.FC<GamesListProps> = ({
  games,
  searchParams,
}: GamesListProps) => {
  const list = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    searchParams?.page || 1
  );

  const [visibleGames, setVisibleGames] = useState<Game[]>(games);
  const [loading, setLoading] = useState<boolean>(false);
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
    if (list.current) {
      list.current.scrollIntoView({ behavior: "smooth" });
    }
    setVisibleGames(games);
  }, [games]);

  useEffect(() => {
    if (list.current) {
      list.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <div className={classes.gamesList} ref={list} id="#list">
        {visibleGames.map((game: Game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
      {loading && <div className={classes.loading}>Loading...</div>}
    </>
  );
};
