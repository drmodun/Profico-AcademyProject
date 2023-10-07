"use client";

import { getMyFavourites } from "api/FavouriteApi";
import { getLikesAndDislikes } from "api/LikesAndDislikesApi";
import { Favourite } from "api/FavouriteApi";
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
  updateLikes: (id: number, type: number) => void;
  updateFavourites: (favourite: Favourite) => void;
  updateDislikes: (id: number, type: number) => void;
}

const defaultUserContext: UserContextProps = {
  user: undefined,
  favourites: [],
  likes: [],
  dislikes: [],
  logout: () => {},
  setUser: () => {},
  updateLikes: (id: number, type: number) => {},
  updateDislikes: (id: number, type: number) => {},
  updateFavourites: (favourite: Favourite) => {},
};

export const UserContext = createContext<UserContextProps>(defaultUserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [likes, setLikes] = useState<number[]>([]);
  const [dislikes, setDislikes] = useState<number[]>([]);

  const getMyData = async () => {
    const response = await getMe();
    if (response) {
      setUser(response);
      return;
    }
    setUser(undefined);
  };

  const updateLikes = (id: number, type: number) => {
    const possibleDislike = dislikes?.find((dislike) => dislike === id);
    if (possibleDislike) {
      updateDislikes(id, 0);
    }

    if (!likes) return;
    if (type === 1) {
      setLikes((prev) => [...prev, id]);
      return;
    }
    setLikes((prev) => prev.filter((like) => like !== id));
  };

  const updateFavourites = (favourite: Favourite) => {
    if (!favourites) return;
    const possibleFavourite = favourites.find(
      (fav) => fav.gameId === favourite.gameId
    );
    if (possibleFavourite) {
      setFavourites((prev) =>
        prev.filter((fav) => fav.gameId !== favourite.gameId)
      );
      return;
    }
    setFavourites((prev) => [...prev, favourite]);
  };

  const updateDislikes = (id: number, type: number) => {
    const possibeLike = likes?.find((like) => like === id);
    if (possibeLike) {
      updateLikes(id, 0);
    }

    if (!dislikes) return;
    if (type === 1) {
      setDislikes((prev) => [...prev, id]);
      return;
    }
    setDislikes((prev) => prev.filter((dislike) => dislike !== id));
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
    setFavourites([]);
  };

  const getMyLikesData = async () => {
    const response = await getLikesAndDislikes();
    if (response) {
      setLikes(response.likes);
      setDislikes(response.dislikes);
      return;
    }
    setLikes([]);
    setDislikes([]);
  };

  useEffect(() => {
    const user = localStorage.getItem("jwtToken");
    const loggInDate = localStorage.getItem("time");
    if (!user || !loggInDate) return;
    const time = new Date(loggInDate).getTime();
    console.log(time, user);
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
      value={{
        user,
        likes,
        favourites,
        dislikes,
        setUser,
        logout,
        updateLikes,
        updateDislikes,
        updateFavourites,
      }}
    >
      0 {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export default useUser;
