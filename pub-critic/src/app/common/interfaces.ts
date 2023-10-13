export interface PlatformFull {
  platform: Platform;
  released_at: string;
}

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}
export interface Screenshot {
  id: number;
  image: string;
}

export interface Genre {
  id?: number;
  name: string;
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
  name: string;
  released: string;
  background_image: string;
  metacritic: number;
  rating: number;
  genres: Genre[] | undefined ;
  platforms: PlatformFull[];
  parent_platforms: FullParentPlatform[];
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
export interface Option {
  label: string;
  value: string | number;
}

export interface ParentPlatform {
  id: number;
  name: string;
  slug: string;
}

export interface FullParentPlatform {
  platform: ParentPlatform;
}
export interface PostReviewProps {
  title: string;
  body: string;
  score: number;
  gameName: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Avarage {
  gameId: number;
  count: number;
  avarage: number;
}

export interface Review {
  id: number;
  title: string;
  body: string;
  score: number;
  gameId: number;
  userId: number;
  gameName: string;
  author: Author;
  date: string;
}
