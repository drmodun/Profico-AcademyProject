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
import { getAllAvarageRatings } from "api/ReviewsApi";

const getGame = async () => {
  const response = await getGames();
  if (response) {
    return response.results;
  }
};

const getLatest = async () => {
  const response = await getLatestGames();
  if (response) {
    return response.results;
  }
};

const getAvarages = async () => {
  const response = await getAllAvarageRatings();
  console.log(response);
  if (response) {
    return response;
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
  const avarages = await getAvarages();

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
        <HomePageSection title="Featured" avarages={avarages} games={games} />
        <HomePageSection title="Top Rated" games={top} avarages={avarages} />
        <HomePageSection title="Upcoming" games={latest} avarages={avarages} />
      </div>
    </div>
  );
}
//Possibly use the idea of pubs and reviews of them if real api exists
