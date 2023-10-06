"use client";
import { getMe, logoutUser } from "api/UserApi";
import classes from "./page.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "components/profileCard";
import { EditableUserInfo } from "components/editableUserInfo/EditableUserInfo";
import { getFavourites, getMyFavourites } from "api/FavouriteApi";
import { Favourite } from "api/Shared";
import { DetailedGame, Genre } from "api/GamesShared";
import { getGame } from "api/GamesApi";
import GameCard from "components/GameCard";
import { getAllAvarageRatings, myReviews } from "api/ReviewsApi";
import { Avarage, Review, User } from "common/interfaces";
import ReviewsList from "components/ReviewsList";
import Tabs from "components/Tabs";
import UserPageBody from "components/UserPageBody";

enum tabs {
  Info,
  Reviews,
  Favourites,
}

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<string>("Info");
  const [favoritesList, setFavoritesList] = useState<Favourite[]>([
    //{ genres: ["Action"], gameId: 0, userId: 0 },
  ]);
  const [favourites, setFavourites] = useState<DetailedGame[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avarages, setAvareges] = useState<Avarage[]>([]);

  const getUser = async () => {
    const response = await getMe();
    if (response) {
      setUser(response);
      await fetchFavourites();
    }
  };

  const fetchReviews = async () => {
    const respone = await myReviews();
    if (respone) {
      setReviews(respone);
    }
  };

  const fetchAvarages = async () => {
    const response = await getAllAvarageRatings();
    if (response) {
      setAvareges(response);
    }
  };

  const fetchFavourites = async () => {
    const response: Favourite[] = await getMyFavourites();
    console.log(response);
    if (response) {
      setFavoritesList(response);
      await fetchFavouriteGames(response);
      return;
    }
    setFavoritesList([]);
  };

  const fetchFavouriteGames = async (games: Favourite[]) => {
    const response: DetailedGame[] = await Promise.all(
      games.map((f) => f.gameId).map((id) => getGame(id))
    );
    console.log(response);
    if (response) {
      setFavourites(response);
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
            favourites={favourites}
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
