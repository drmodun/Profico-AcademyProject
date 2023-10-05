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
  likeScore: number;
}
