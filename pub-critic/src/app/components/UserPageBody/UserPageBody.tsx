"use client";
import { Avarage, Review, User } from "common/interfaces";
import classes from "./UserPageBody.module.scss";
import { DetailedGame } from "api/GamesShared";
import { getUser } from "api/UserApi";
import ReviewsList from "components/ReviewsList";
import EditableUserInfo from "components/editableUserInfo";
import GameCard from "components/GameCard";
import Tabs from "components/Tabs";
import { useEffect, useState } from "react";
import UserInfo from "components/UserInfo";
import { Favourite, getMyFavourites } from "api/FavouriteApi";

interface UserPageBodyProps {
  reviews: Review[];
  favourites: DetailedGame[];
  user: User;
  avarages: Avarage[];
  isMine?: boolean;
}

export const UserPageBody = ({
  reviews,
  favourites,
  user,
  isMine,
  avarages,
}: UserPageBodyProps) => {
  const [tab, setTab] = useState<string>("Info");
  const [localFavourites, setFavourites] = useState<Favourite[]>([]);

  const fetchLocalFavourites = async () => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt || isMine) {
      return;
    }
    const response = await getMyFavourites();
    if (response) {
      setFavourites(response);
    }
  };

  useEffect(() => {
    fetchLocalFavourites();
  }, []);
  return (
    <div className={classes.content}>
      <Tabs tab={tab} setTab={setTab}></Tabs>
      <div className={classes.tabContent}>
        {tab === "Reviews" && (
          <ReviewsList areMine={isMine} reviews={reviews} />
        )}
        {tab === "Info" &&
          (isMine ? (
            <EditableUserInfo
              getMe={getUser}
              initBio={user.bio}
              initEmail={user.email}
              initName={user.name}
            />
          ) : (
            <UserInfo user={user} />
          ))}
        {tab === "Favourites" && (
          <div className={classes.favourites}>
            Favourites
            <div className={classes.list}>
              {favourites &&
                favourites.map((game) => (
                  <GameCard
                    avarageRating={
                      avarages?.find((avarage) => avarage.gameId === game.id)
                        ?.avarage
                    }
                    game={{
                      id: game.id,
                      name: game.name,
                      background_image: game.background_image,
                      released: game.released,
                      rating: game.rating,
                      metacritic: game.metacritic,
                      genres: game.genres,
                      platforms: game.platforms,
                    }}
                    key={game.id}
                    isFavourite={
                      isMine ||
                      (localFavourites &&
                        localFavourites.find(
                          (favourite) => favourite.gameId === game.id
                        ) !== undefined)
                    }
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
