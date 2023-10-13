import Image from "next/image";
import classes from "./page.module.scss";
import gaming from "assets/gaming.webp";
import RegisterForm from "components/forms/registerForm";
import LoginForm from "components/forms/loginForm";
import ProfileCard from "components/profileCard";
import { getGames, getLatestGames, getRatedGames } from "api/GamesApi";
import GameCard from "components/GameCard";
import { Game } from "common/interfaces";
import { getFavourites } from "api/FavouriteApi";
import { Favourite } from "api/Shared";
import HomePageSection from "components/HomepageSection";

const getGame = async () => {
  const response = await getGames();
  if (response) {
    return response.results;
  }
};

const getFavorites = async () => {
  const response = await getFavourites(1);
  if (response) {
    return response;
  }
};

const getLatest = async () => {
  const response = await getLatestGames();
  if (response) {
    return response.results;
  }
};

const getRated = async () => {
  const response = await getRatedGames();
  if (response) {
    return response.results;
  }
};

export default async function Home() {
  const games = await getGame();
  const latest = await getLatest();
  const top = await getRated();
  const favourites = await getFavorites();

  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <div className={classes.image}>
          <Image src={gaming} alt="pub" layout="fill" objectFit="cover" />
          <div className={classes.backdrop}></div>
          <div className={classes.title}>
            <h1>Pub-Critic</h1>
            <span>The best place to find real game reviews by real people</span>
          </div>
        </div>
        <HomePageSection title="Featured" games={games} />
        <HomePageSection title="Top Rated" games={top} />
        <HomePageSection title="Upcoming" games={latest} />
      </div>
    </div>
  );
}
//Possibly use the idea of pubs and reviews of them if real api exists
