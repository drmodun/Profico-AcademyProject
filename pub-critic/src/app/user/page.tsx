"use client";
import { User } from "api/UserApi";
import classes from "./page.module.scss";
import { useState } from "react";

enum tabs {
  info,
  reviews,
  favourites,
}

const UserPage = () => {
  const [user, setUser] = useState<User>(null);
  const [tab, setTab] = useState<string>("reviews");
  return (
    <div className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.user}>
        <div className={classes.tabRow}>
          {Object.values(tabs)
            .filter((t) => typeof t === "string")
            .map((t) => (
              <div
                className={classes.tab}
                onClick={() => setTab(t as string)}
                key={t}
              >
                {t}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
