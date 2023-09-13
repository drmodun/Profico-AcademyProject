import { getGames, getGenres, getPlatforms } from "api/GamesApi";
import classes from "./page.module.scss";
import { Filter } from "components/Filter/Filter";

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

const GamesPage = async () => {
  const genres = await fetchGenres();
  const platforms = await fetchPlatforms();
  const games = await getGames();
  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <Filter genres={genres} platforms={platforms} />
      </div>
    </div>
  );
};

export default GamesPage;
