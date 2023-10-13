"use client";
import { User, getMe, logoutUser } from "api/UserApi";
import classes from "./page.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "components/profileCard";
import { EditableUserInfo } from "components/editableUserInfo/EditableUserInfo";
import { getFavourites, getMyFavourites } from "api/FavouriteApi";
import { Favourite } from "api/Shared";
import { DetailedGame, Game, Genre } from "common/interfaces";
import { getGame } from "api/GamesApi";
import GameCard from "components/GameCard";
import { getAllAvarageRatings, myReviews } from "api/ReviewsApi";
import { Avarage, Review } from "common/interfaces";
import ReviewsList from "components/ReviewsList";

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
  const [favourites, setFavourites] = useState<Game[]>([]);
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
    const response: Game[] = await Promise.all(
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
            totalReviews={0}
            likeScore={0}
          />
          <button className={classes.logout} onClick={logoutUser}>
            Logout
          </button>
        </div>
        <div className={classes.content}>
          <div className={classes.tabRow}>
            {Object.values(tabs)
              .filter((t) => typeof t === "string")
              .map((t) => (
                <div
                  className={
                    tab === t ? classes.tab + " " + classes.active : classes.tab
                  }
                  onClick={() => setTab(t as string)}
                  key={t}
                >
                  {t}
                </div>
              ))}
          </div>
          <div className={classes.tabContent}>
            {tab === "Reviews" && (
              <ReviewsList refetch={fetchReviews} areMine reviews={reviews} />
            )}
            {tab === "Info" && (
              <EditableUserInfo
                getMe={getUser}
                initName={user?.name || "Loading..."}
                initEmail={user?.email || "Loading..."}
                initBio={user?.bio || "Loading..."}
              />
            )}
            {tab === "Favourites" && (
              <div className={classes.favourites}>
                Favourites
                <div className={classes.list}>
                  {favourites &&
                    favoritesList &&
                    favourites.map((game) => (
                      <GameCard
                        avarageRating={
                          avarages?.find(
                            (avarage) => avarage.gameId === game.id
                          )?.avarage
                        }
                        game={{
                          id: game.id,
                          name: game.name,
                          background_image: game.background_image,
                          released: game.released,
                          rating: game.rating,
                          metacritic: game.metacritic,
                          genres: game.genres,
                          parent_platforms: game.parent_platforms,
                          platforms: game.platforms,
                        }}
                        key={game.id}
                        isFavourite={true}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
