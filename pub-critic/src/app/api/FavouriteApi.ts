import axios from "axios";
import { baseURL, setJWT } from "./Shared";
import exp from "constants";

export interface Favourite {
  gameId: number;
  genres: string[];
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
      (token && config.url?.includes("short")) ||
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

export const postFavourite = async (favourite: Favourite) => {
  try {
    const response = await api.post("/favourites", favourite);
    if (response.status === 201) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getFavourites = async (id: number) => {
  try {
    const response = await fetch(baseURL + "/favourites/" + id);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavourite = async (id: number) => {
  try {
    const response = await api.delete("/favourites/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
