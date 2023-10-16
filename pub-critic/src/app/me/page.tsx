"use client";
import { getMe, logoutUser } from "api/UserApi";
import classes from "./page.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "components/profileCard";
import { EditableUserInfo } from "components/editableUserInfo/EditableUserInfo";
import { getFavourites, getMyFavourites } from "api/FavouriteApi";
import { Favourite } from "api/FavouriteApi";
import { DetailedGame, Game, Genre } from "common/interfaces";
import { getGame } from "api/GamesApi";
import GameCard from "components/GameCard";
import { getAllAvarageRatings, myReviews } from "api/ReviewsApi";
import { Avarage, Review, User } from "common/interfaces";
import ReviewsList from "components/ReviewsList";
import Tabs from "components/Tabs";
import UserPageBody from "components/UserPageBody";
import useUser from "utils/UserContext";
import Spinner from "components/LoadingSpinner";
import Portal from "utils/Portal/Portal";
import Modal from "utils/Modal";

enum MeModals {
  Logout,
  Edit,
  Delete,
}

const UserPage = () => {
  const { favourites, user, setUser, loading } = useUser();
  const [favouritesList, setFavouritesList] = useState<Game[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avarages, setAvareges] = useState<Avarage[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<MeModals>(MeModals.Edit);

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
    const response: Game[] = await Promise.all(
      games.map((f) => f.gameId).map((id) => getGame(id))
    );
    console.log(response);
    if (response) {
      setFavouritesList(response);
    }
  };

  const handleLogout = () => {
    setModalOpen(true);
    setModalText(MeModals.Logout);
    setTimeout(() => {
      logoutUser();
    }, 750);
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
        <Modal
          open={modalOpen}
          close={() => setModalOpen(false)}
          title={
            modalText === MeModals.Edit
              ? "Edited account"
              : modalText === MeModals.Delete
              ? "Deleted account"
              : "Logged out"
          }
          text={
            modalText === MeModals.Edit
              ? "User updated successfully, refetching data"
              : modalText === MeModals.Delete
              ? "User deleted successfully, redirecting to home page"
              : "Logged out successfully, redirecting to home page"
          }
        />
        <div className={classes.short}>
          <ProfileCard
            id={user?.id || 0}
            name={user?.name || "Loading..."}
            totalReviews={reviews.length || 0}
            likeScore={user?.likeScore! || 0}
            followers={user?.followers! || 0}
            following={user?.following! || 0}
          />
          <button className={classes.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
        {!loading && user && favouritesList && avarages && reviews ? (
          <UserPageBody
            reviews={reviews}
            favourites={favouritesList}
            user={user}
            avarages={avarages}
            isMine
            refresh={fetchReviews}
            openModal={() => setModalOpen(true)}
            setModalText={setModalText}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default UserPage;
