import { getGame, getScreenshots } from "api/GamesApi";
import classes from "./page.module.scss";
import { Screenshots } from "components/Screenshots/Screenshots";
import GameInfo from "components/GameInfo";
import ReviewCard from "components/Review";
import { Review, getReviews } from "api/ReviewsApi";
import ReviewForm from "components/ReviewForm";

const fetchGameDetails = async (gameId: number) => {
  const response = await getGame(gameId);
  if (response) {
    return response;
  }
};

const fetchGameScreenshots = async (gameId: number) => {
  const response = await getScreenshots(gameId);
  if (response) {
    return response;
  }
};

const fetchReviews = async (gameId: number) => {
  const response = await getReviews(gameId);
  if (response) {
    return response;
  }
};

const GamePage = async ({ params }: { params: any }) => {
  const game = await fetchGameDetails(params.gameId);
  const screenshots = await fetchGameScreenshots(params.gameId);
  const reviews = await fetchReviews(params.gameId);
  console.log(screenshots);

  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <GameInfo
          background_image={game.background_image}
          description={game.description}
          metacritic={game.metacritic}
          metacritic_url={game.metacritic_url}
          name={game.name}
          platforms={game.platforms}
          rating={game.rating}
          released={game.released}
          screenshots={screenshots.results}
          id={game.id}
          website={game.website}
        />
        <div className={classes.description}>
          <h2>About</h2>
          <div className={classes.genres}>
            {game.genres &&
              game.genres.map((genre: any) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
          </div>
          <p>{game.description_raw}</p>
        </div>
        <div className={classes.tags}>
          {game.tags &&
            game.tags.map((tag: any) => (
              <span className={classes.tag} key={tag.id}>
                {tag.name}
              </span>
            ))}
        </div>
        <ReviewForm gameId={game.id} gameName={game.name} />
        <div className={classes.reviews}>
          <h2>Reviews</h2>
          {reviews &&
            reviews.map((review: Review, index: number) => (
              <ReviewCard
                key={review.gameId.toString() + index}
                review={review}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
