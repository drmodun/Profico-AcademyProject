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
export const checkFollowStatus = async (userId: number) => {
  try {
    const response = await api.get(`/followers/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const toggleFollow = async (userId: number) => {
  try {
    const response = await api.post(`/followers/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserFollowers = async (userId: number) => {
  try {
    const response = await fetch(`${baseURL}/followers/${userId}/followers`, {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUserFollowing = async (userId: number) => {
  try {
    const response = await fetch(`${baseURL}/followers/${userId}/following`, {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
