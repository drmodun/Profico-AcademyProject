import axios from "axios";
import { baseURL } from "./Shared";

export interface PostReviewProps {
  title: string;
  body: string;
  score: number;
}

export interface Author {
  id: number;
  name: string;
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

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (
      (token &&
        ["post", "put", "delete", "patch"].includes(config.method || "")) ||
      (token && config.url?.includes("games")) ||
      (token && config.url?.includes("favourite")) ||
      (token && config.url?.includes("me"))
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const PostReview = async (body: PostReviewProps, gameId: number) => {
  if (localStorage.getItem("jwtToken") === null) {
    return false;
  }
  try {
    const response = await api.post(`/reviews/${gameId}/reviews`, body);
    if (response.status === 201) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getReviews = async (gameId: number) => {
  try {
    const response = await fetch(baseURL + "/reviews/games/" + gameId, {
      cache: "no-store",
    });
    console.log(response.url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export const deleteReview = async (reviewId: number) => {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getReview = async (reviewId: number) => {
  try {
    const response = await fetch(baseURL + "/reviews/" + reviewId, {
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateReview = async (reviewId: number, body: PostReviewProps) => {
  try {
    const response = await api.patch(`/reviews/${reviewId}`, body);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const myReviews = async () => {
  try {
    const response = await api.get("/reviews/me");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getReviewsForUser = async (userId: number) => {
  try {
    const response = await fetch(baseURL + "/reviews/users/" + userId, {
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
