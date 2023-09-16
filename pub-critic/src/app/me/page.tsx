"use client";
import { User, getMe, logoutUser } from "api/UserApi";
import classes from "./page.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "components/profileCard";
import { EditableUserInfo } from "components/editableUserInfo/EditableUserInfo";
import { getFavourites, getMyFavourites } from "api/FavouriteApi";
import { Favourite } from "api/Shared";
import { DetailedGame, Genre } from "api/GamesShared";
import { getGame } from "api/GamesApi";
import GameCard from "components/GameCard";
import { myReviews } from "api/ReviewsApi";
import { Review } from "api/ReviewsApi";
import ReviewCard from "components/Review";

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
              <div className={classes.reviews}>
                {reviews &&
                  reviews.map((review, index) => (
                    <ReviewCard
                      key={review.gameId.toString() + index}
                      review={review}
                    />
                  ))}
              </div>
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
                        game={{
                          id: game.id,
                          name: game.name,
                          background_image: game.background_image,
                          released: game.released,
                          rating: game.rating,
                          metacritic: game.metacritic,
                          genres: favoritesList
                            .filter((f) => f.gameId === game.id)[0]
                            .genres.map((genre: string) => {
                              return { name: genre };
                            }),
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
