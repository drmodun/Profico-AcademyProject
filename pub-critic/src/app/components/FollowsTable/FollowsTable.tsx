"use client";

import { User } from "common/interfaces";
import { useState } from "react";
import classes from "./FollowsTable.module.scss";
import UserCard from "components/UserCard";
import clsx from "clsx";

interface FollowsTableProps {
  followers: User[];
  following: User[];
  firstTab?: number;
}

export const FollowsTable = ({
  followers,
  following,
  firstTab,
}: FollowsTableProps) => {
  const [tab, setTab] = useState<number>(firstTab || 0);

  return (
    <div className={classes.container}>
      <div className={classes.tabRow}>
        <button
          className={clsx(classes.tab, tab ? "" : classes.active)}
          onClick={() => setTab(0)}
        >
          Followers
        </button>
        <button
          className={clsx(classes.tab, tab ? classes.active : "")}
          onClick={() => setTab(1)}
        >
          Following
        </button>
      </div>
      <div className={classes.table}>
        {!tab
          ? followers.map((follower) => (
              <UserCard key={follower.id} user={follower} />
            ))
          : following.map((follow) => (
              <UserCard key={follow.id} user={follow} />
            ))}
      </div>
    </div>
  );
};
