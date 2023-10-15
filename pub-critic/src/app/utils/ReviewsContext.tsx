"use client";

import { getMyFavourites } from "api/FavouriteApi";
import { getLikesAndDislikes } from "api/LikesAndDislikesApi";

import { Avarage, User } from "common/interfaces";
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ReviewsContextProps {
  avarages: Avarage[];
  setAvarages: Dispatch<React.SetStateAction<Avarage[]>>;
  avaragesLoading: boolean;
}

const defaultReviewContext: ReviewsContextProps = {
  avarages: [],
  setAvarages: () => {},
  avaragesLoading: false,
};

export const ReviewContext =
  createContext<ReviewsContextProps>(defaultReviewContext);

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [avarages, setAvarages] = useState<Avarage[]>([]);
  const [avaragesLoading, setAvaragesLoading] = useState<boolean>(true);

  const getAvarages = async () => {
    const avarages = await getLikesAndDislikes();
    setAvarages(avarages);
    setAvaragesLoading(false);
  };

  useEffect(() => {
    getAvarages();
  }, []);

  return (
    <ReviewContext.Provider
      value={{
        avarages,
        setAvarages,
        avaragesLoading,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

const useReview = () => useContext(ReviewContext);
export default useReview;
