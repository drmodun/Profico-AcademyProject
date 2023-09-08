import { Backdrop } from "components/backdrop/Backdrop";
import classes from "./page.module.scss";
import tempBackground from "assets/gaming.webp";
import LoginForm from "components/forms/loginForm";

const Login = () => {
  return (
    <div className={classes.container}>
      <Backdrop image={tempBackground} />
      <LoginForm />
    </div>
  );
};

export default Login;
