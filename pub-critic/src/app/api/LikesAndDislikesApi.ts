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
        ["post", "put", "delete", "patch", "get"].includes(
          config.method || ""
        )) ||
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

export const getLikesAndDislikes = async () => {
  try {
    const response = await api.get(`/likes/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const toggleLike = async (reviewId: number) => {
  try {
    const response = await api.post(`/likes/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const toggleDislike = async (reviewId: number) => {
  try {
    const response = await api.post(`/dislikes/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
