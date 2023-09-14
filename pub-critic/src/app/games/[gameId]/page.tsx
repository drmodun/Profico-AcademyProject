import { getGame, getScreenshots } from "api/GamesApi";
import classes from "./page.module.scss";
import { Screenshots } from "components/Screenshots/Screenshots";

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

const GamePage = async ({ params }: { params: any }) => {
  const game = await fetchGameDetails(params.gameId);
  const screenshots = await fetchGameScreenshots(params.gameId);
  console.log(screenshots);

  return (
    <div className={classes.container}>
      <div className={classes.page}>
        <Screenshots screenshots={screenshots.results} />
      </div>
    </div>
  );
};

export default GamePage;
