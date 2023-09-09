"use client";
import { User, getMe } from "api/UserApi";
import classes from "./page.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "components/profileCard";
import { EditableUserInfo } from "components/editableUserInfo/EditableUserInfo";
import { get } from "http";

enum tabs {
  Info,
  Reviews,
  Favourites,
}

const UserPage = () => {
  const [user, setUser] = useState<User>(null);
  const [tab, setTab] = useState<string>("reviews");

  const getUser = async () => {
    const response = await getMe();
    if (response) {
      setUser(response);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.user}>
        <ProfileCard name={user?.name} totalReviews={0} likeScore={0} />
        <div className={classes.content}>
          <div className={classes.tabRow}>
            {Object.values(tabs)
              .filter((t) => typeof t === "string")
              .map((t) => (
                <div
                  className={
                    tab === t ? classes.tab + " " + classes.active : classes.tab
                  }
                  onClick={() => setTab(t as string)}
                  key={t}
                >
                  {t}
                </div>
              ))}
          </div>
          <div className={classes.tabContent}>
            {tab === "Reviews" && (
              <div className={classes.later}>Reviews (to add after games)</div>
            )}
            {tab === "Info" && <EditableUserInfo />}
            {tab === "Favourites" && (
              <div className={classes.later}>
                Favourites (to add after games)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
