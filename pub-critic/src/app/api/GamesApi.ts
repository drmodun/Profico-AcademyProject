import { apiKey, gamesApi } from "./GamesShared";

export const getGames = async (page: number = 1, pageSize: number = 20) => {
  try {
    const response = await fetch(
      `${gamesApi}/games?key=${apiKey}&page=${page}&page_size=${pageSize}`,
      { next: { revalidate: 3600 } }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
