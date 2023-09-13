"use client";
import Image from "next/image";
import classes from "./page.module.scss";
import gaming from "assets/gaming.webp";
import { getGames } from "api/GamesApi";
import { useEffect } from "react";

const getGame = async () => {
  const response = await getGames();
  if (response) {
    console.log(response);
    return response;
  }
};

export default function Home() {
  useEffect(() => {
    getGame();
  }, []);
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
          {/* {games.map((game) => {
            <div className={classes.game}>
              <div className={classes.image}>
                <Image
                  src={game.image}
                  alt="game"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={classes.info}>
                <h2>{game.name}</h2>
                <span>{game.description}</span>
              </div>
            </div>;
          })} */}
          <div
            className={classes.notFound} //Before connecting to api
          >
            No games found, please try again later
          </div>
        </div>
        <div className={classes.section}>
          <h1>Popular</h1>
          <div
            className={classes.notFound} //Before connecting to api
          >
            No games found, please try again later
          </div>
        </div>
        <div className={classes.section}>
          <h1>Upcoming</h1>
          <div
            className={classes.notFound} //Before connecting to api
          >
            No games found, please try again later
          </div>
        </div>
      </div>
    </div>
  );
}
//Possibly use the idea of pubs and reviews of them if real api exists
