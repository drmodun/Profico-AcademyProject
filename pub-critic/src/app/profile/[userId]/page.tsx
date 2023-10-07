import { getMe, getUser, logoutUser } from "api/UserApi";
import classes from "./page.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "components/profileCard";
import { EditableUserInfo } from "components/editableUserInfo/EditableUserInfo";
import { getFavourites, getMyFavourites } from "api/FavouriteApi";
import { Favourite } from "api/Shared";
import { DetailedGame, Genre } from "api/GamesShared";
import { getGame } from "api/GamesApi";
import GameCard from "components/GameCard";
import {
  getAllAvarageRatings,
  getReviewsForUser,
  myReviews,
} from "api/ReviewsApi";
import { Avarage, Review, User } from "common/interfaces";
import ReviewsList from "components/ReviewsList";
import { Tabs } from "components/Tabs/Tabs";
import UserPageBody from "components/UserPageBody";
import FollowButton from "components/FollowButton";

const fetchUser = async (userId: number) => {
  const response = await getUser(userId);
  if (response) {
    return response;
  }
  window.location.href = "/404";
};

const fetchFavourites = async (userId: number) => {
  const response: Favourite[] = await getFavourites(userId);
  console.log(response);
  if (response) {
    const games: DetailedGame[] = await Promise.all(
      response.map((f) => f.gameId).map((id) => getGame(id))
    );
    return games;
  }
  return [];
};

const fetchReviews = async (userId: number) => {
  const response = await getReviewsForUser(userId);
  if (response) {
    return response;
  }
  return [];
};

const fetchAvarages = async () => {
  const response = await getAllAvarageRatings();
  if (response) {
    return response;
  }
  return [];
};

const ProfilePage = async ({ params }: { params: any }) => {
  const user: User = await fetchUser(params.userId);
  const favourites = await fetchFavourites(params.userId);
  const reviews = await fetchReviews(params.userId);
  //{ genres: ["Action"], gameId: 0, userId: 0 },
  const avarages = await fetchAvarages();

  return (
    <div className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.user}>
        <div className={classes.short}>
          <ProfileCard
            id={user.id!}
            name={user?.name || "Loading..."}
            totalReviews={reviews.length}
            likeScore={user.likeScore!}
            followers={user.followers!}
            following={user.following!}
          />
          <FollowButton userId={user.id!} />
        </div>
        <UserPageBody
          reviews={reviews}
          favourites={favourites}
          user={user}
          avarages={avarages}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
