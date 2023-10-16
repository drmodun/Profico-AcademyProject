import axios from "axios";
import { baseURL, setJWT } from "./Shared";
import exp from "constants";
import { User } from "common/interfaces";

export interface UserEdit {
  name?: string;
  bio?: string;
  email?: string;
}

interface LoginUser {
  email: string;
  password: string;
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

export const postUser = async (user: User) => {
  try {
    const response = await api.post("/users", user);
    if (response.status === 201) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loginUser = async (user: LoginUser) => {
  try {
    const response = await api.post("/auth/login", user);
    setJWT(response.data.accessToken);
    return true;
  } catch (error) {
    return false;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getByJwt = async (jwt: string) => {
  try {
    const response = await fetch(baseURL + "/users/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (id: number) => {
  try {
    const response = await fetch(baseURL + `/users/${id}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editMe = async (user: UserEdit) => {
  try {
    const response = await api.patch("/users/", user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async () => {
  try {
    const response = await api.delete("/users/");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("time");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("time");
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
};
