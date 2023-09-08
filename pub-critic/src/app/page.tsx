import Image from "next/image";
import classes from "./page.module.scss";
import gaming from "assets/gaming.webp";
import RegisterForm from "components/forms/registerForm";
import LoginForm from "components/forms/loginForm";

export default function Home() {
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
          <LoginForm />
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
