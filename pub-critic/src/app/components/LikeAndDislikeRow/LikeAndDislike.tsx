"use client";

import { checkLikeStatus, toggleLike } from "api/LikesAndDislikesApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import Like from "assets/Like.svg";
import Dislike from "assets/Dislike.svg";
import classes from "./LikeAndDislike.module.scss";
import clsx from "clsx";

export interface LikeAndDislikeProps {
  reviewId: number;
  likeScore: number;
}

export const LikeAndDislike = ({
  reviewId,
  likeScore,
}: LikeAndDislikeProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    checkStatus();
  }, [reviewId]);

  const handleLike = async () => {
    try {
      const response = await toggleLike(reviewId);
      if (!response) throw new Error("Something went wrong");
      setIsLiked((prev) => !prev);
      setIsDisliked(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await toggleLike(reviewId);
      if (!response) throw new Error("Something went wrong");
      setIsDisliked((prev) => !prev);
      setIsLiked(false);
    } catch (error) {
      console.error(error);
    }
  };

  const checkStatus = async () => {
    try {
      const response = await checkLikeStatus(reviewId);
      if (!response) throw new Error("Something went wrong");
      const status = response.status;
      switch (status) {
        case 1:
          setIsLiked(true);
          break;
        case -1:
          setIsDisliked(true);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <Image
        className={clsx(classes.icon, isLiked && classes.active)}
        onClick={handleDislike}
        src={Dislike}
        alt="Dislike"
      />
      <span>{likeScore}</span>
      <Image
        className={clsx(classes.icon, isDisliked && classes.active)}
        onClick={handleLike}
        src={Like}
        alt="like"
      />
    </div>
  );
};
