export const gamesApi = "https://api.rawg.io/api";
export const apiKey = "464bc085dbbf4f33bcb2ccb39d36a6ec";

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}
export interface DetailedGame {
  id: number;
  name: string;
  metacritic: number;
  released: string;
  background_image: string;
  description: string;
  rating: number;
  platforms: PlatformFull[];
  website: string;
  metacritic_url: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface PlatformFull {
  platform: Platform;
  released_at: string;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
  image: string;
  year_end: number;
  year_start: number;
  games_count: number;
  image_background: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  metacritic: number;
  rating: number;
  short_screenshots: Screenshot[];
  tags: Tag[];
  genres: Genre[];
  platforms: PlatformFull[];
}
