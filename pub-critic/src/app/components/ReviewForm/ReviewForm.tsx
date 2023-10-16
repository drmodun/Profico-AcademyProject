//wont split this into more components since it does not seem reusable, most likely will also just use default form handling since it only contains two fields and a star
//form is custom (stars rating) so cannot use default form handling
"use client";

import React, { useEffect, useState } from "react";
import classes from "./ReviewForm.module.scss";
import Image from "next/image";
import star from "assets/star.svg";
import lackOfStar from "assets/lackOfStar.svg";
import { postReview, updateReview } from "api/ReviewsApi";
import { set } from "react-hook-form";
import Modal from "utils/Modal";

interface ReviewFormProps {
  gameId: number;
  isEdit?: boolean;
  refetch?: () => Promise<void>;
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
  refetch,
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
  const [token, setToken] = useState<string | null>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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

    if (isEdit && body === initReview!.body && title === initReview!.title) {
      setError("You must change something to update your review");
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
      setModalOpen(true);
      refetch!();
      return;
    }
    setError("Something went wrong");
  };
  useEffect(() => {
    setToken(localStorage.getItem("jwtToken"));
  }, []);

  const handleSetRating = (rating: number) => {
    setRating(rating);
  };

  const handleSetBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSetTitle = (title: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(title.target.value);
  };

  return (
    <form id="#review" onSubmit={handleSubmit} className={classes.form}>
      <Modal
        open={modalOpen}
        close={() => setModalOpen(false)}
        title={isEdit ? "Edit successful" : "Review posted successfully"}
        text={isEdit ? "Your review was updated" : "Your review was posted"}
      />

      <h2 className={classes.heading}>
        {isEdit ? "Edit your review" : "Write a review"}
      </h2>
      <div className={classes.stars}>
        <span>Rating: </span>
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <label
            key={starNumber + "star"}
            htmlFor={`rating-${starNumber}`}
            onClick={handleSetRating.bind(null, starNumber)}
          >
            <Image
              src={rating >= starNumber ? star : lackOfStar}
              alt="star"
              layout="fill"
            />
          </label>
        ))}
      </div>
      <input
        type="text"
        name="title"
        id="#title"
        className={classes.title}
        value={title}
        onChange={handleSetTitle}
        placeholder="Title"
      />

      <textarea
        name="body"
        id="#body"
        rows={10}
        className={classes.body}
        value={body}
        onChange={handleSetBody}
        placeholder="Body"
      />

      <button
        type="submit"
        disabled={!token}
        className={token ? classes.submit : classes.disabled}
      >
        {token ? "Submit" : "Login to submit"}
      </button>
      <span className={classes.error}>{error ? "Error: " + error : ""}</span>
    </form>
  );
};
