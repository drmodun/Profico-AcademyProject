"use client";

import Screenshots from "components/Screenshots";
import classes from "./GameInfo.module.scss";
import { Platform, PlatformFull, Screenshot } from "common/interfaces";
import Image from "next/image";
import contoller from "assets/controller.svg";
import Link from "next/link";

interface GameInfoProps {
  name: string;
  description: string;
  metacritic: number;
  rating: number;
  released: string;
  background_image: string;
  screenshots: Screenshot[];
  platforms: PlatformFull[];
  website: string;
  metacritic_url: string;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  name,
  description,
  metacritic,
  rating,
  background_image,
  platforms,
  released,
  website,
  metacritic_url,
  screenshots,
}: GameInfoProps) => (
  <div className={classes.container}>
    <h2>{name}</h2>
    <div className={classes.game}>
      <Screenshots screenshots={screenshots} />
      <div className={classes.info}>
        <div className={classes.image}>
          <Image
            src={background_image ? background_image : contoller}
            alt="game"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={classes.platforms}>
          {platforms.map((platform) => (
            <div className={classes.platform} key={platform.platform.id}>
              {platform.platform.name}
            </div>
          ))}
        </div>
        <div className={classes.released}>
          <span>Released: {released} </span>
        </div>
        <div className={classes.buttons}>
          <Link href={website} className={classes.link}>
            <button className={classes.visit}>Visit Website</button>
          </Link>
          <Link href={"#"} className={classes.link}>
            <button className={classes.favourite}>Add to favourites</button>
          </Link>
          <Link href={"#"} className={classes.link}>
            <button className={classes.review}>Leave a review</button>
          </Link>
        </div>
        <div className={classes.ratings}>
          <div className={classes.rating}>
            <span className={classes.ratingTitle}>Source: </span>
            <span className={classes.ratingValue}>{rating}</span>
          </div>
          <div className={classes.rating}>
            <a href={metacritic_url} className={classes.ratingTitle}>
              Metacritic:{" "}
            </a>
            <span className={classes.ratingValue}>{metacritic}</span>
          </div>
          <div className={classes.rating}>
            <span className={classes.ratingTitle}>Pub: </span>
            <span className={classes.ratingValue}>TODO</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
