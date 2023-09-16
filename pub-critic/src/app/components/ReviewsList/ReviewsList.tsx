"use client";
import { useEffect, useState } from "react";
import classes from "./ReviewsList.module.scss";
import { Review } from "api/ReviewsApi";
import Switch from "components/Switch";
import ReviewCard from "components/Review";

export interface ReviewsListProps {
  reviews: Review[];
}

enum SortProps {
  Date,
  Rating,
  Alphabetical,
}

enum SortOrder {
  Ascending,
  Descending,
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  const [sortBy, setSortBy] = useState<SortProps>(SortProps.Date);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Ascending);
  const [visibleReviews, setVisibleReviews] = useState<Review[]>();

  const handleSetSortBy = (value: SortProps) => {
    setSortBy(value);
  };

  const handleSetSortOrder = (value: SortOrder) => {
    setSortOrder(value);
  };

  const handleSort = (reviews: Review[]) => {
    const sorted = [...reviews].sort((a, b) => {
      switch (sortBy) {
        case SortProps.Date:
          return sortOrder === SortOrder.Ascending
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        case SortProps.Rating:
          return sortOrder === SortOrder.Ascending
            ? a.score - b.score
            : b.score - a.score;
        case SortProps.Alphabetical:
          return sortOrder === SortOrder.Ascending
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
      }
    });
    setVisibleReviews(sorted);
  };

  useEffect(() => {
    handleSort(reviews);
  }, [sortBy, sortOrder, reviews]);

  useEffect(() => {
    handleSort(reviews);
  }, []);

  return (
    <div className={classes.list}>
      <span className={classes.title}>
        <h2>Reviews</h2>
      </span>
      <div className={classes.sort}>
        <div className={classes.element}>
          <span>Sort by: </span>
          <Switch
            options={[
              { label: "Date", value: SortProps.Date },
              { label: "Rating", value: SortProps.Rating },
              { label: "Alphabetical", value: SortProps.Alphabetical },
            ]}
            onSwitch={handleSetSortBy}
          />
        </div>
        <div className={classes.element}>
          <span>Order: </span>
          <Switch
            options={[
              { label: "Ascending", value: SortOrder.Ascending },
              { label: "Descending", value: SortOrder.Descending },
            ]}
            onSwitch={handleSetSortOrder}
          />
        </div>
      </div>
      <div className={classes.reviews}>
        {visibleReviews &&
          visibleReviews.map((review: Review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
      </div>
    </div>
  );
};
