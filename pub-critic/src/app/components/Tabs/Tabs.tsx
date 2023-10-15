"use client";
import clsx from "clsx";
import classes from "./Tabs.module.scss";

enum tabs {
  Info,
  Reviews,
  Favourites,
}

export interface TabsProps {
  tab: string;
  setTab: (tab: string) => void;
}

export const Tabs = ({ tab, setTab }: TabsProps) => (
  <div className={classes.tabRow}>
    {Object.values(tabs)
      .filter((t) => typeof t === "string")
      .map((t) => (
        <div
          className={clsx(classes.tab, tab === t ? classes.active : "")}
          onClick={() => setTab(t as string)}
          key={t}
        >
          {t}
        </div>
      ))}
  </div>
);
