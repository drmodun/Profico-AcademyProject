import { apiKey, gamesApi } from "./GamesShared";

export const getGames = async (page: number = 1, pageSize: number = 20) => {
  try {
    const response = await fetch(
      `${gamesApi}/games?key=${apiKey}&page=${page}&page_size=${pageSize}`,
      { next: { revalidate: 3600 * 24 * 31 } }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getLatestGames = async (
  page: number = 8,
  pageSize: number = 20
) => {
  try {
    const response = await fetch(
      `${gamesApi}/games?key=${apiKey}&dates=2023-01-01&page=${page}&page_size=${pageSize}&ordering=-released`,
      { next: { revalidate: 3600 * 8 } }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getRatedGames = async (
  page: number = 1,
  pageSize: number = 20
) => {
  try {
    const response = await fetch(
      `${gamesApi}/games?key=${apiKey}&page=${page}&page_size=${pageSize}&ordering=-metacritic`,
      { next: { revalidate: 3600 * 8 } }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
