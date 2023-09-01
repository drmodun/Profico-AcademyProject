import Image from "next/image";
import classes from "./page.module.scss";
import gaming from "./assets/gaming.webp"
export default function Home() {
  return (
    <div className={classes.Container}>
      <div className={classes.Page}>
        <div className={classes.Image}>
          <Image
            src={gaming}
            alt="pub"
            layout="fill"
            objectFit="cover"
          />
          <div className={classes.Backdrop}></div>
          <div className={classes.Title}>
            <h1>Pub-Critic</h1>  
            <span>The best place to find real game reviews by real people</span>
          </div>
        </div>
        <div className={classes.Section}>
          <h1>Featured</h1>
          <div
            className={classes.NotFound} //Before connecting to api
          >
            No games found, please try again later
          </div>
        </div>
        <div className={classes.Section}>
          <h1>Popular</h1>
          <div
            className={classes.NotFound} //Before connecting to api
          >
            No games found, please try again later
          </div>
        </div>
        <div className={classes.Section}>
          <h1>Upcoming</h1>
          <div
            className={classes.NotFound} //Before connecting to api
          >
            No games found, please try again later
          </div>
        </div>
      </div>
    </div>
  );
}
//Possibly use the idea of pubs and reviews of them if real api exists
