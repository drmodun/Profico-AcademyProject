"use client";
import { getMe, logoutUser } from "api/UserApi";
import classes from "./page.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "components/profileCard";
import { EditableUserInfo } from "components/editableUserInfo/EditableUserInfo";
import { getFavourites, getMyFavourites } from "api/FavouriteApi";
import { Favourite } from "api/FavouriteApi";
import { DetailedGame, Genre } from "api/GamesShared";
import { getGame } from "api/GamesApi";
import GameCard from "components/GameCard";
import { getAllAvarageRatings, myReviews } from "api/ReviewsApi";
import { Avarage, Review, User } from "common/interfaces";
import ReviewsList from "components/ReviewsList";
import Tabs from "components/Tabs";
import UserPageBody from "components/UserPageBody";
import useUser from "utils/UserContext";

enum tabs {
  Info,
  Reviews,
  Favourites,
}

const UserPage = () => {
  const [tab, setTab] = useState<string>("Info");
  const { favourites, user, setUser } = useUser();
  const [favouritesList, setFavouritesList] = useState<DetailedGame[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avarages, setAvareges] = useState<Avarage[]>([]);

  const getUser = async () => {
    if (user) {
      fetchFavouriteGames(favourites || []);
    }
  };

  const fetchReviews = async () => {
    const response = await myReviews();
    if (response) {
      setReviews(response);
    }
  };

  const fetchAvarages = async () => {
    const response = await getAllAvarageRatings();
    if (response) {
      setAvareges(response);
    }
  };

  const fetchFavouriteGames = async (games: Favourite[]) => {
    const response: DetailedGame[] = await Promise.all(
      games.map((f) => f.gameId).map((id) => getGame(id))
    );
    console.log(response);
    if (response) {
      setFavouritesList(response);
    }
  };

  useEffect(() => {
    getUser();
    fetchReviews();
    fetchAvarages();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.user}>
        <div className={classes.short}>
          <ProfileCard
            id={user?.id || 0}
            name={user?.name || "Loading..."}
            totalReviews={reviews.length || 0}
            likeScore={user?.likeScore! || 0}
            followers={user?.followers! || 0}
            following={user?.following! || 0}
          />
          <button className={classes.logout} onClick={logoutUser}>
            Logout
          </button>
        </div>
        {user ? (
          <UserPageBody
            reviews={reviews}
            favourites={favouritesList}
            user={user}
            avarages={avarages}
            isMine
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default UserPage;
