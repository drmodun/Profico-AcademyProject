import { Game, Platform, PlatformFull } from "common/interfaces";
import classes from "./GameCard.module.scss";
import Image from "next/image";
import attachPlatformImage from "utils/static/PlatformAttacher";
import controller from "assets/controller.svg";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className={classes.game}>
      <div className={classes.image}>
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt="game"
            objectFit="cover"
            layout="fill"
          />
        ) : (
          <Image src={controller} alt="game" objectFit="cover" layout="fill" />
        )}
      </div>
      <div className={classes.info}>
        <span className={classes.releaseDate}>
          {new Date(game.released).toLocaleDateString()}
        </span>
        <h2 className={classes.name}>{game.name}</h2>
        <div className={classes.ratings}>
          <div className={classes.rating}>
            <span className={classes.ratingTitle}>Source: </span>
            <span className={classes.ratingValue}>{game.rating}</span>
          </div>
          <div className={classes.rating}>
            <span className={classes.ratingTitle}>Metacritic: </span>
            <span className={classes.ratingValue}>{game.metacritic}</span>
          </div>
          <div className={classes.rating}>
            <span className={classes.ratingTitle}>Pub: </span>
            <span className={classes.ratingValue}>TODO</span>
          </div>
        </div>
        <div className={classes.platforms}>
          {attachPlatformImage(game.parent_platforms).map((platform, index) => (
            <div className={classes.platform} key={game.id + index}>
              {<Image src={platform} alt="platform" layout="fill" />}
            </div>
          ))}
        </div>
        <div className={classes.genres}>
          {game.genres.map((genre) => (
            <span className={classes.genre} key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
