export const gamesApi = "https://api.rawg.io/api";
export const apiKey = "464bc085dbbf4f33bcb2ccb39d36a6ec";

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

export const getGenres = async () => {
  try {
    const response = await fetch(`${gamesApi}/genres?key=${apiKey}`, {
      next: { revalidate: 3600 * 24 * 31 },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPlatforms = async () => {
  try {
    const response = await fetch(`${gamesApi}/platforms?key=${apiKey}`, {
      next: { revalidate: 3600 * 24 * 31 },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export interface FilterProps {
  search?: string;
  page: number;
  pageSize: number;
  genre?: number;
  platform?: number;
  metacritic?: string;
  ordering?: string;
}

export const getFilteredGames = async ({
  search = "",
  page = 1,
  pageSize = 20,
  genre,
  platform,
  ordering,
  metacritic,
}: FilterProps) => {
  try {
    const response = await fetch(
      `${gamesApi}/games?key=${apiKey}&page=${page}&page_size=${pageSize}${
        genre && `&genres=${genre}`
      }${platform && `&platforms=${platform}`}${
        metacritic && `&metacritic=${metacritic}`
      }${search && `&search=${search}`}${ordering && `&ordering=${ordering}`}
      `
    );
    console.log(response.url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getGame = async (id: number) => {
  try {
    const response = await fetch(`${gamesApi}/games/${id}?key=${apiKey}`, {
      next: { revalidate: 3600 * 24 * 31 },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getScreenshots = async (id: number) => {
  try {
    const response = await fetch(
      `${gamesApi}/games/${id}/screenshots?key=${apiKey}`,
      {
        cache: "force-cache",
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
