//wont split this into more components since it does not seem reusable, most likely will also just use default form handling since it only contains two fields and a star
//form is custom (stars rating) so cannot use default form handling
"use client";

import React, { useState } from "react";
import classes from "./ReviewForm.module.scss";
import Image from "next/image";
import star from "assets/star.svg";
import lackOfStar from "assets/lackOfStar.svg";
import { PostReview } from "api/ReviewsApi";

interface ReviewFormProps {
  gameId: number;
}

export const ReviewForm = ({ gameId }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(rating, title, body);
    console.log("submitted");

    const response = await PostReview(
      {
        body,
        title,
        score: rating,
      },
      gameId
    );
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <h2 className={classes.heading}>Write a review</h2>
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
    </form>
  );
};
