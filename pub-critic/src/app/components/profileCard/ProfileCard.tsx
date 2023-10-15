import Image from "next/image";
import classes from "./ProfileCard.module.scss";
import user from "assets/user.svg";
import Link from "next/link";

interface ProfileCardProps {
  name: string;
  totalReviews: number;
  //    totalFollowers: number; if I end up adding follower and following functionality
  likeScore: number;
  following?: number;
  followers?: number;
  id: number;
}

export const ProfileCard = ({
  name,
  id,
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
        <Link
          className={classes.link}
          href={{
            pathname: "/follows/" + id,
            query: { tab: 0 },
          }}
        >
          {followers} followers
        </Link>
        <Link
          className={classes.link}
          href={{
            pathname: "/follows/" + id,
            query: { tab: 1 },
          }}
        >
          {following} following
        </Link>
      </div>
    </div>
  );
};
