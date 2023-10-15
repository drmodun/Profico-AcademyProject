import { getUserFollowers, getUserFollowing } from "api/FollowApi";
import { User } from "common/interfaces";
import FollowsTable from "components/FollowsTable";
import { parse } from "path";

import classes from "./page.module.scss";

const getFollowers = async (id: string) => {
  const response = await getUserFollowers(parseInt(id));
  if (response) {
    return response;
  }
  return [];
};

const getFollowing = async (id: string) => {
  const response = await getUserFollowing(parseInt(id));
  if (response) {
    return response;
  }
  return [];
};

const FollowsPage = async ({ params, searchParams }: any) => {
  const id = params.userId;
  const firstTab = searchParams?.tab as number;
  console.log(firstTab);
  const followers: User[] = await getFollowers(id);
  const following: User[] = await getFollowing(id);

  return (
    <div className={classes.container}>
      <FollowsTable
        followers={followers}
        firstTab={firstTab}
        following={following}
      />
    </div>
  );
};

export default FollowsPage;
