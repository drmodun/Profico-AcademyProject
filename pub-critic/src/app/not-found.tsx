import classes from "./not-found.module.scss";

const NotFound = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>404</h1>
      <p className={classes.subtitle}>Page not found</p>
      <p className={classes.text}>
        The page you are looking for does not exist or has been removed, sorry
        :(
      </p>
    </div>
  );
};

export default NotFound;
