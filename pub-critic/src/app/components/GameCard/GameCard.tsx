import { Game, Platform, PlatformFull } from "api/GamesShared";
import classes from "./GameCard.module.scss";
import Image from "next/image";
import playstation from "assets/playstation.svg";
import xbox from "assets/xbox.svg";
import nintendo from "assets/nintendo.svg";
import epic from "assets/epic.svg";
import steam from "assets/steam.svg";
import controller from "assets/controller.svg";
import Link from "next/link";
interface GameCardProps {
  game: Game;
}

const attachPlatformImage = (platforms: PlatformFull[]) => {
  const images = [];
  if (
    platforms.find((p) => p.platform.name.toLowerCase().includes("playStation"))
  ) {
    images.push(playstation);
  }
  if (platforms.find((p) => p.platform.name === "PC")) {
    images.push(steam);
  }
  if (platforms.find((p) => p.platform.name.toLowerCase().includes("xbox"))) {
    images.push(xbox);
  }
  if (
    platforms.find((p) => p.platform.name.toLowerCase().includes("nintendo"))
  ) {
    images.push(nintendo);
  }
  if (platforms.find((p) => p.platform.name.toLowerCase().includes("epic"))) {
    images.push(epic);
  }
  return images;
};

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
        <Link href={`/games/${game.id}`} className={classes.name}>
          {game.name}
        </Link>
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
          {attachPlatformImage(game.platforms).map((platform, index) => (
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
