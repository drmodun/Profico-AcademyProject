import axios from "axios";
import { baseURL, setJWT } from "./Shared";
import exp from "constants";

interface User {
  email: string;
  password: string;
  name: string;
  bio: string;
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
      (token && ["post", "put", "delete"].includes(config.method || "")) ||
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
    alert("Incorrect email or password");
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
