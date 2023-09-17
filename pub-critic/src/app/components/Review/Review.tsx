"use client";
import classes from "./Review.module.scss";
import { Review, deleteReview } from "api/ReviewsApi";
import Image from "next/image";
import user from "assets/user.svg";

import { starMaker } from "utils/starMaker";
import Link from "next/link";
import ReviewForm from "components/ReviewForm";
import { useState } from "react";

interface ReviewProps {
  isMine?: boolean;
  review: Review;
}

export const ReviewCard: React.FC<ReviewProps> = ({ review, isMine }) => {
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const handleEdit = () => {
    setEditOpen((prev) => !prev);
  };

  const handleDelete = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmation) return;
    const response = await deleteReview(review.id);
    if (response) {
      alert("Review deleted");
      window.location.reload();
      return;
    }
    alert("Something went wrong");
  };

  return (
    <div className={classes.review}>
      <div className={classes.reviewHeader}>
        <div className={classes.image}>
          <Image
            src={user}
            alt="user"
            objectFit="cover"
            layout="fill" //potentially add other users pages later
          />
        </div>
        <div className={classes.names}>
          <span className={classes.username}>{review.author.name}</span>
          <Link href={"/games/" + review.gameId} className={classes.gameName}>
            Review of: {review.gameName}
          </Link>
        </div>
      </div>
      <div className={classes.reviewBody}>
        <div className={classes.upper}>
          <div className={classes.score}>
            {starMaker(review.score).map((star, index) => (
              <div key={review.id + index} className={classes.star}>
                {star}
              </div>
            ))}
          </div>
          <div className={classes.date}>
            {new Date(review.date).toLocaleString()}
          </div>
        </div>
        <div className={classes.title}>
          <h2>{review.title}</h2>
        </div>
        <div className={classes.body}>{review.body}</div>
        <div className={classes.reviewFooter}>
          TODO - add likes and dislikes
        </div>
        {isMine && (
          <>
            <div className={classes.actions}>
              <button className={classes.edit} onClick={handleEdit}>
                Edit
              </button>
              <button className={classes.delete} onClick={handleDelete}>
                Delete
              </button>
            </div>
            {editOpen && (
              <ReviewForm
                gameId={review.gameId}
                gameName={review.gameName}
                isEdit
                initReview={review}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};