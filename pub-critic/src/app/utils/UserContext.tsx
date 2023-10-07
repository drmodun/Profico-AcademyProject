"use client";

import { getMyFavourites } from "api/FavouriteApi";
import { getLikesAndDislikes } from "api/LikesAndDislikesApi";
import { Favourite } from "api/Shared";
import { getMe } from "api/UserApi";
import { User } from "common/interfaces";
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

interface UserContextProps {
  user?: User;
  favourites?: Favourite[];
  likes?: number[];
  dislikes?: number[];
  logout?: () => void;
  setUser: Dispatch<User>;
}

const defaultUserContext: UserContextProps = {
  user: undefined,
  favourites: undefined,
  likes: undefined,
  dislikes: undefined,
  logout: () => {},
  setUser: () => {},
};

export const UserContext = createContext<UserContextProps>(defaultUserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [favourites, setFavourites] = useState<Favourite[] | undefined>(
    undefined
  );
  const [likes, setLikes] = useState<number[] | undefined>(undefined);
  const [dislikes, setDislikes] = useState<number[] | undefined>(undefined);

  const getMyData = async () => {
    const response = await getMe();
    if (response) {
      setUser(response);
      return;
    }
    setUser(undefined);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("time");
    setUser(undefined);
  };

  const getMyFavouritesData = async () => {
    const response = await getMyFavourites();
    if (response) {
      setFavourites(response);
      return;
    }
    setFavourites(undefined);
  };

  const getMyLikesData = async () => {
    const response = await getLikesAndDislikes();
    if (response) {
      setLikes(response.likes);
      setDislikes(response.dislikes);
      return;
    }
    setLikes(undefined);
    setDislikes(undefined);
  };

  useEffect(() => {
    const user = localStorage.getItem("jwtToken");
    const loggInDate = localStorage.getItem("time");
    const time = new Date(loggInDate).getTime();
    console.log(time, user);
    if (!user) return;
    if (Date.now() - time > 3600 * 24) {
      logout();
      return;
    }
    getMyData();
  }, []);

  useEffect(() => {
    if (!user) return;
    getMyFavouritesData();
    getMyLikesData();
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, likes, favourites, dislikes, setUser, logout }}
    >
      0 {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export default useUser;
