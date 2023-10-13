import { getGame, getScreenshots } from "api/GamesApi";
import classes from "./page.module.scss";
import { Screenshots } from "components/Screenshots/Screenshots";
import GameInfo from "components/GameInfo";

const fetchGameDetails = async (gameId: number) => {
  const response = await getGame(gameId);
  if (response) {
    console.log("No game found with this id");
    //404 page later, redirect when I implement it
    return response;
  }
};

const fetchGameScreenshots = async (gameId: number) => {
  const response = await getScreenshots(gameId);
  if (response) {
    console.log("Fetching screenshots failed"); //not sure what to do here
    return response;
  }
};

const GamePage = async ({ params }: { params: any }) => {
  const game = await fetchGameDetails(params.gameId);
  const screenshots = await fetchGameScreenshots(params.gameId);

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
      </div>
    </div>
  );
};

export default GamePage;
