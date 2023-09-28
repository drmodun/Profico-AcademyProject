import axios from "axios";
import { baseURL } from "./Shared";
import { PostReviewProps } from "common/interfaces";
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

export const postReview = async (body: PostReviewProps, gameId: number) => {
  if (localStorage.getItem("jwtToken") === null) {
    return false;
  }
  try {
    const response = await api.post(`/reviews/${gameId}`, body);
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
    if (response.status === 200 || response.status === 204) {
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

export const getAllAvarageRatings = async () => {
  try {
    const response = await fetch(baseURL + "/reviews/avg", {
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getAvarageRatingForGame = async (gameId: number) => {
  try {
    const response = await fetch(baseURL + "/reviews/avg/" + gameId, {
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
