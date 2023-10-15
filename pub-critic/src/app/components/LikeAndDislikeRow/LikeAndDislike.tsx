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


enum likeStatus {
  liked = 1,
  disliked = -1,
  neutral = 0,
}

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


  const handleLikeDislike = async (action: string) => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      alert("You must be logged in to like or dislike a review");
      return;
    }

    setLoading(true);
    let likeIncrement = 0;

    switch (status) {
      case likeStatus.liked:
        likeIncrement = action === "like" ? -1 : -2;
        action === "like" ? updateLikes(reviewId, 0) : updateDislikes(reviewId, 1);
        break;
      case likeStatus.disliked:
        likeIncrement = action === "like" ? 2 : 1;
        action === "like" ? updateLikes(reviewId, 1) : updateDislikes(reviewId, 0);
        break;
      default:
        likeIncrement = action === "like" ? 1 : -1;
        action === "like" ? updateLikes(reviewId, 1) : updateDislikes(reviewId, 1);
        break;
    }

    const oldStatus = status;
    const liked = isLiked;
    const disliked = isDisliked;

    try {
      if (action === "like") {
        setStatus(isLiked ? likeStatus.neutral : likeStatus.liked);
        setIsLiked((prev) => !prev);
        setIsDisliked(false);
        await toggleLike(reviewId);
      } else {
        setStatus(isDisliked ? likeStatus.neutral : likeStatus.disliked);
        setIsDisliked((prev) => !prev);
        setIsLiked(false);
        await toggleDislike(reviewId);
      }
    } catch (error) {
      if (action === "like") {
        setIsLiked((prev) => !prev);
      } else {
        setIsDisliked((prev) => !prev);
      }
      setIsLiked(liked);
      setIsDisliked(disliked);
      setStatus(oldStatus);
      console.error(error);
    }

    setLikes((prev) => prev + likeIncrement);
    setLoading(false);
  };


  const handleLike = () => {
    handleLikeDislike("like");
  };

  const handleDislike = () => {
    handleLikeDislike("dislike");
  };

  useEffect(() => {
    if (likes?.find((like) => like === reviewId)) {
      setIsLiked(true);
      setStatus(1);
    }
    if (dislikes?.find((dislike) => dislike === reviewId)) {
      setIsDisliked(true);
      setStatus(-1);
    }
  }, [likes, dislikes]);

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
