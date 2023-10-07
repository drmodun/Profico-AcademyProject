"use client";
import { toggleDislike, toggleLike } from "api/LikesAndDislikesApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import Like from "assets/Like.svg";
import Dislike from "assets/Dislike.svg";
import classes from "./LikeAndDislike.module.scss";
import clsx from "clsx";
import { set } from "react-hook-form";
import useUser from "utils/UserContext";

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
  const [totalLikes, setTotalLikes] = useState<number>(likeScore);
  const [status, setStatus] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { likes, dislikes, updateDislikes, updateLikes } = useUser();

  const handleLike = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("You must be logged in to like a review");
      return;
    }
    setLoading(true);
    switch (status) {
      case 1:
        setTotalLikes((prev) => prev - 1);
        updateLikes(reviewId, 0);
        break;
      case -1:
        setTotalLikes((prev) => prev + 2);
        updateLikes(reviewId, 1);
        break;
      default:
        setTotalLikes((prev) => prev + 1);
        updateLikes(reviewId, 1);
        break;
    }

    const oldStatus = status;
    const disliked = isDisliked;
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
      setIsDisliked(disliked);
      setStatus(oldStatus);
      console.error(error);
    }
    setLoading(false);
  };

  const handleDislike = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("You must be logged in to dislike a review");
      return;
    }
    setLoading(true);
    switch (status) {
      case 1:
        setTotalLikes((prev) => prev - 2);
        updateDislikes(reviewId, 1);
        break;
      case -1:
        setTotalLikes((prev) => prev + 1);
        updateDislikes(reviewId, 0);
        break;
      default:
        setTotalLikes((prev) => prev - 1);
        updateDislikes(reviewId, 1);
        break;
    }
    const oldStatus = status;
    const liked = isLiked;
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
      setIsLiked(liked);
      setStatus(oldStatus);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      <Image
        className={clsx(classes.icon, isDisliked && classes.active)}
        onClick={!loading ? handleDislike : undefined}
        src={Dislike}
        alt="Dislike"
      />
      <span className={classes.score}>{totalLikes}</span>
      <Image
        className={clsx(classes.icon, isLiked && classes.active)}
        onClick={!loading ? handleLike : undefined}
        src={Like}
        alt="like"
      />
    </div>
  );
};
