//wont split this into more components since it does not seem reusable, most likely will also just use default form handling since it only contains two fields and a star
//form is custom (stars rating) so cannot use default form handling
"use client";

import React, { useState } from "react";
import classes from "./ReviewForm.module.scss";
import Image from "next/image";
import star from "assets/star.svg";
import lackOfStar from "assets/lackOfStar.svg";
import { postReview, updateReview } from "api/ReviewsApi";

interface ReviewFormProps {
  gameId: number;
  isEdit?: boolean;
  initReview?: {
    score: number;
    title: string;
    body: string;
    id: number;
  };
  gameName: string;
}

export const ReviewForm = ({
  gameId,
  gameName,
  initReview,
  isEdit,
}: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(
    initReview ? initReview.score : 0
  );
  const [title, setTitle] = useState<string>(
    initReview ? initReview.title : ""
  );
  const [body, setBody] = useState<string>(initReview ? initReview.body : "");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(rating, title, body);
    console.log("submitted");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (title.length < 3) {
      setError("Title must be at least 3 characters long");
      return;
    }

    if (body.length < 10) {
      setError("Body must be at least 10 characters long");
      return;
    }

    if (isEdit !== (initReview !== undefined)) {
      setError("You cannot edit an empty review");
      return;
    }

    const response = isEdit
      ? await updateReview(initReview!.id, {
          body,
          title,
          score: rating,
          gameName,
        })
      : await postReview(
          {
            body,
            title,
            score: rating,
            gameName,
          },
          gameId
        );
    if (response) {
      alert(
        isEdit ? "Review updated successfully" : "Review posted successfully"
      );
      window.location.reload();
      return;
    }
    setError("Something went wrong");
  };

  return (
    <form id="#review" onSubmit={handleSubmit} className={classes.form}>
      <h2 className={classes.heading}>
        {isEdit ? "Edit your review" : "Write a review"}
      </h2>
      <div className={classes.stars}>
        <span>Rating: </span>
        <label htmlFor="rating-1" onClick={() => setRating(1)}>
          <Image
            src={rating >= 1 ? star : lackOfStar}
            alt="star"
            layout="fill"
          />
        </label>
        <label htmlFor="rating-2" onClick={() => setRating(2)}>
          <Image
            src={rating >= 2 ? star : lackOfStar}
            alt="star"
            layout="fill"
          />
        </label>
        <label htmlFor="rating-3" onClick={() => setRating(3)}>
          <Image
            src={rating >= 3 ? star : lackOfStar}
            alt="star"
            layout="fill"
          />
        </label>
        <label htmlFor="rating-4" onClick={() => setRating(4)}>
          <Image
            src={rating >= 4 ? star : lackOfStar}
            alt="star"
            layout="fill"
          />
        </label>
        <label htmlFor="rating-5" onClick={() => setRating(5)}>
          <Image
            src={rating >= 5 ? star : lackOfStar}
            alt="star"
            layout="fill"
          />
        </label>
      </div>
      <input
        type="text"
        name="title"
        id="#title"
        className={classes.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        name="body"
        id="#body"
        rows={10}
        className={classes.body}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />

      <button
        type="submit"
        disabled={!localStorage.getItem("jwtToken")}
        className={
          localStorage.getItem("jwtToken") ? classes.submit : classes.disabled
        }
      >
        {localStorage.getItem("jwtToken") ? "Submit" : "Login to submit"}
      </button>
      <span className={classes.error}>{error ? "Error: " + error : ""}</span>
    </form>
  );
};
