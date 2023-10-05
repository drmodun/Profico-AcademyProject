import { User } from "api/UserApi";
import classes from "./UserInfo.module.scss";

interface UserInfoProps {
  user: User;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className={classes.container}>
      <h1>User info</h1>
      <div className={classes.info}>
        <p className={classes.label}>Username: {user.name}</p>
        <p className={classes.label}>Email: {user.email}</p>
        <p className={classes.label}>Bio: {user.bio}</p>
      </div>
    </div>
  );
};
