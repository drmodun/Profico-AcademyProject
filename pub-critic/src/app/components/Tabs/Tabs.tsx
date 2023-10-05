"use client";
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
);
