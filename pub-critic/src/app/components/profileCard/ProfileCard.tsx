import Image from "next/image";
import classes from "./ProfileCard.module.scss";
import user from "assets/user.svg";

interface ProfileCardProps {
  name: string;
  totalReviews: number;
  //    totalFollowers: number; if I end up adding follower and following functionality
  likeScore: number;
  following?: number;
  followers?: number;
}

export const ProfileCard = ({
  name,
  following = 0,
  totalReviews,
  followers = 0,
  likeScore,
}: ProfileCardProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.pic}>
        <Image src={user} alt="profile picture" />
      </div>
      <h2 className={classes.name}>{name}</h2>
      <div className={classes.info}>
        <p>{totalReviews} reviews</p>
        <p>{likeScore} like score</p>
      </div>
      <div className={classes.follows}>
        <p>{followers} followers</p>
        <p>{following} following</p>
      </div>
    </div>
  );
};
