"use client";

import { User } from "common/interfaces";
import { use, useEffect, useState } from "react";
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
  const [tab, setTab] = useState<number>(firstTab);
  const [listToRender, setListToRender] = useState(
    firstTab ? following : followers
  );
  console.log(firstTab, tab, listToRender);

  useEffect(() => {
    setListToRender(tab === 1 ? following : followers);
  }, [tab]);

  useEffect(() => {
    setTab(firstTab || 0);
  }, [firstTab]);

  return (
    <div className={classes.container}>
      <div className={classes.tabRow}>
        <button
          className={clsx(classes.tab, tab === 1 ? "" : classes.active)}
          onClick={() => setTab(0)}
        >
          Followers
        </button>
        <button
          className={clsx(classes.tab, tab === 1 ? classes.active : "")}
          onClick={() => setTab(1)}
        >
          Following
        </button>
      </div>
      <div className={classes.table}>
        {listToRender.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
