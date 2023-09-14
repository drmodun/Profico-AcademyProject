"use client";
import Image from "next/image";
import classes from "./Screenshots.module.scss";
import { useState } from "react";
import { Screenshot } from "api/GamesShared";

interface ScreenshotsProps {
  screenshots: Screenshot[];
}

export const Screenshots = ({ screenshots }: ScreenshotsProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className={classes.container}>
      <div className={classes.selected}>
        <Image
          src={screenshots[selected].image}
          alt="screenshot"
          layout="fill"
        />
      </div>
      <div className={classes.screenshots}>
        {screenshots.map((screenshot, index) => (
          <div className={classes.screenshot} key={screenshot.id}>
            <Image
              className={index === selected ? classes.selected : ""}
              key={index}
              src={screenshot.image}
              alt="screenshot"
              layout="fill"
              onClick={() => setSelected(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
