"use client";

import {
  checkLikeStatus,
  toggleDislike,
  toggleLike,
} from "api/LikesAndDislikesApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import Like from "assets/Like.svg";
import Dislike from "assets/Dislike.svg";
import classes from "./LikeAndDislike.module.scss";
import clsx from "clsx";
import { set } from "react-hook-form";

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
  const [likes, setLikes] = useState<number>(likeScore);
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    checkStatus();
  }, [reviewId]);

  const handleLike = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("You must be logged in to like a review");
      return;
    }
    switch (status) {
      case 1:
        setLikes((prev) => prev - 1);
        break;
      case -1:
        setLikes((prev) => prev + 2);
        break;
      default:
        setLikes((prev) => prev + 1);
        break;
    }

    const oldStatus = status;
    try {
      setStatus(isLiked ? 0 : 1);
      setIsLiked((prev) => !prev);
      setIsDisliked(false);
      const response = await toggleLike(reviewId);
      if (!response) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setIsLiked((prev) => !prev);
      setIsDisliked(false);
      setStatus(oldStatus);
      console.error(error);
    }
  };

  const handleDislike = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("You must be logged in to dislike a review");
      return;
    }
    switch (status) {
      case 1:
        setLikes((prev) => prev - 2);
        break;
      case -1:
        setLikes((prev) => prev + 1);
        break;
      default:
        setLikes((prev) => prev - 1);
        break;
    }
    const oldStatus = status;
    setStatus(isDisliked ? 0 : -1);
    try {
      setIsDisliked((prev) => !prev);
      setIsLiked(false);
      const response = await toggleDislike(reviewId);
      if (!response) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      setIsDisliked((prev) => !prev);
      setIsLiked(true);
      setStatus(oldStatus);
      console.error(error);
    }
  };

  const checkStatus = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) return;
    try {
      const response = await checkLikeStatus(reviewId);
      if (!response) throw new Error("Something went wrong");
      console.log(response);
      const status = response.liked;
      setStatus(status);
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
        className={clsx(classes.icon, isDisliked && classes.active)}
        onClick={handleDislike}
        src={Dislike}
        alt="Dislike"
      />
      <span className={classes.score}>{likes}</span>
      <Image
        className={clsx(classes.icon, isLiked && classes.active)}
        onClick={handleLike}
        src={Like}
        alt="like"
      />
    </div>
  );
};
