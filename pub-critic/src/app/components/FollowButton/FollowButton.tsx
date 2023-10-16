"use client";
import { useEffect, useState } from "react";
import classes from "./FollowButton.module.scss";
import { checkFollowStatus, toggleFollow } from "api/FollowApi";
import clsx from "clsx";

interface FollowButtonProps {
  userId: number;
}

export const FollowButton = ({ userId }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);


  const checkStatus = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      return;
    }
    const response = await checkFollowStatus(userId);
    if (response) {
      setIsFollowing(true);
    }
  };

  const handleToggleFollow = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      return;
    }
    setIsFollowing((prev) => !prev);
    const response = await toggleFollow(userId);
    if (response) {
      return;
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className={classes.container}>
      <button
        className={clsx(isFollowing ? classes.following : classes.notFollowing)}
        onClick={handleToggleFollow}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};
