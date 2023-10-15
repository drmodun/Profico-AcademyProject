import { User } from "common/interfaces";
import classes from "./UserCard.module.scss";
import pfp from "assets/user.svg";
import Image from "next/image";
import Link from "next/link";
export interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.pic}>
          <Image layout="fill" src={pfp} alt="profile picture" />
        </div>
        <div className={classes.content}>
          <h2 className={classes.name}>{user.name}</h2>
          <h3 className={classes.email}>
            {user.email ? user.email : "No email provided"}
          </h3>
          <p className={classes.desc}>
            {user.bio ? user.bio : "No description provided"}
          </p>
          <div className={classes.info}>
            <p>{user.followers} followers</p>
            <p>{user.likeScore} like score</p>
          </div>
        </div>
      </div>

      <Link className={classes.button} href={"/profile/" + user.id}>
        View Profile
      </Link>
    </div>
  );
};
