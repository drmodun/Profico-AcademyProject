import { getGames, getGenres, getPlatforms } from "api/GamesApi";

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
