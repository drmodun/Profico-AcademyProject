"use client";
import { Avarage, Game, Review, User } from "common/interfaces";
import classes from "./UserPageBody.module.scss";
import { getUser } from "api/UserApi";
import ReviewsList from "components/ReviewsList";
import EditableUserInfo from "components/editableUserInfo";
import GameCard from "components/GameCard";
import Tabs from "components/Tabs";
import { useEffect, useState } from "react";
import UserInfo from "components/UserInfo";
import { Favourite, getMyFavourites } from "api/FavouriteApi";
import useUser from "utils/UserContext";

interface UserPageBodyProps {
  reviews: Review[];
  favourites: Game[];
  user: User;
  avarages: Avarage[];
  refresh?: () => Promise<void>;
  isMine?: boolean;
  openModal?: () => void;
  setModalText?: (text: number) => void;
}

export const UserPageBody = ({
  reviews,
  favourites,
  user,
  refresh,
  isMine,
  avarages,
  openModal,
  setModalText,
}: UserPageBodyProps) => {
  const [tab, setTab] = useState<string>("Info");
  const { favourites: localFavourites, updateFavourites } = useUser();


  return (
    <div className={classes.content}>
      <Tabs tab={tab} setTab={setTab}></Tabs>
      <div className={classes.tabContent}>
        {tab === "Reviews" && (
          <ReviewsList areMine={isMine} reviews={reviews} refetch={refresh} />
        )}
        {tab === "Info" &&
          (isMine ? (
            <EditableUserInfo
              initBio={user.bio}
              initEmail={user.email}
              initName={user.name}
              openModal={openModal}
              setModalText={setModalText}
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
                      parent_platforms: game.parent_platforms,
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
