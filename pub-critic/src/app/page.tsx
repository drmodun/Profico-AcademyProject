import Image from "next/image";
import classes from "./page.module.scss";
import gaming from "assets/gaming.webp";
import { getGames, getLatestGames, getRatedGames } from "api/GamesApi";
import GameCard from "components/GameCard";
import { Game } from "common/interfaces";

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
        <div className={classes.section}>
          <h1>Featured</h1>
          {games.length ? (
            <div className={classes.list}>
              {games.map((game: Game) => (
                <div key={game.id} className={classes.listElement}>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={classes.notFound} //Before connecting to api
            >
              No games found, please try again later
            </div>
          )}
        </div>
        <div className={classes.section}>
          <h1>Top rated</h1>
          {top.length ? (
            <div className={classes.list}>
              {top.map((game: Game) => (
                <div key={game.id} className={classes.listElement}>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={classes.notFound} //Before connecting to api
            >
              No games found, please try again later
            </div>
          )}
        </div>
        <div className={classes.section}>
          <h1>Upcoming</h1>
          {latest.length ? (
            <div className={classes.list}>
              {latest.map((game: Game) => (
                <div key={game.id} className={classes.listElement}>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={classes.notFound} //Before connecting to api
            >
              No games found, please try again later
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
//Possibly use the idea of pubs and reviews of them if real api exists
