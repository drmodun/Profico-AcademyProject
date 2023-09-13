import { Game } from "api/GamesShared";
import classes from "./GameCard.module.scss";
import Image from "next/image";
interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className={classes.game}>
      <div className={classes.image}>
        <Image
          src={game.background_image}
          alt="game"
          layout="fill"
          objectFit="cover"
        />
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
        <div className={classes.genres}>
          {game.genres.map((genre) => (
            <span className={classes.genre} key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>
        <div className={classes.platforms}>
          {game.platforms.map((platform) => (
            <span className={classes.platform} key={platform.platform.id}>
              {platform.platform.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
