import {
  getFilteredGames,
  getGames,
  getGenres,
  getPlatforms,
} from "api/GamesApi";
import classes from "./page.module.scss";
import Filter from "components/Filter";
import GameCard from "components/GameCard";
import { get } from "http";
import GamesList from "components/GamesList";
import { getAllAvarageRatings } from "api/ReviewsApi";

const fetchGenres = async () => {
  const response = await getGenres();
  if (response) {
    return response.results;
  }
};

const getAvarages = async () => {
  const response = await getAllAvarageRatings();
  console.log(response);
  if (response) {
    return response;
  }
};

const fetchPlatforms = async () => {
  const response = await getPlatforms();
  if (response) {
    return response.results;
  }
};

const GamesPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: {
    [key: string]: string | string[] | undefined | number | number[];
  };
}) => {
  const genres = await fetchGenres();
  const avarages = await getAvarages();
  const platforms = await fetchPlatforms();
  console.log(searchParams);
  const games = await getFilteredGames({
    search: searchParams?.search as string,
    genre: searchParams?.genre as number,
    platform: searchParams?.platform as number,
    metacritic: searchParams?.metacritic as string,
    page: searchParams?.page as number,
    pageSize: searchParams?.pageSize as number,
    ordering: searchParams?.ordering as string,
  });
  console.log(games);

  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <Filter
          genres={genres}
          platforms={platforms}
          searchParams={searchParams}
        />
        <GamesList
          games={games.results}
          avarages={avarages}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default GamesPage;
