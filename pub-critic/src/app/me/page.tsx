"use client";
import { User, getMe, logoutUser } from "api/UserApi";
import classes from "./page.module.scss";
import { useEffect, useState } from "react";
import ProfileCard from "components/profileCard";
import { EditableUserInfo } from "components/editableUserInfo/EditableUserInfo";

enum tabs {
  Info,
  Reviews,
  Favourites,
}

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<string>("Info");

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
        <div className={classes.short}>
          <ProfileCard
            name={user?.name || "Loading..."}
            totalReviews={0}
            likeScore={0}
          />
          <button className={classes.logout} onClick={logoutUser}>
            Logout
          </button>
        </div>
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
            {tab === "Info" && (
              <EditableUserInfo
                getMe={getUser}
                initName={user?.name || "Loading..."}
                initEmail={user?.email || "Loading..."}
                initBio={user?.bio || "Loading..."}
              />
            )}
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