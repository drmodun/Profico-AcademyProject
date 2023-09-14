import {
  getFilteredGames,
  getGames,
  getGenres,
  getPlatforms,
} from "api/GamesApi";
import classes from "./page.module.scss";
import Filter from "components/Filter";
import GameCard from "components/GameCard";

const fetchGenres = async () => {
  const response = await getGenres();
  if (response) {
    return response.results;
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
  const platforms = await fetchPlatforms();
  console.log(searchParams);
  const games = await getFilteredGames({
    search: searchParams?.search as string,
    genre: searchParams?.genre as number,
    platform: searchParams?.platform as number,
    metacritic: searchParams?.metacritic as string,
    page: searchParams?.page as number,
    pageSize: searchParams?.pageSize as number,
  });
  console.log(games);

  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <Filter genres={genres} platforms={platforms} />
        <div className={classes.games}>
          {games.results.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
