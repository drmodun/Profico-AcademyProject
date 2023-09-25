"use client";
import Image from "next/image";
import classes from "./Screenshots.module.scss";
import { useState } from "react";
import { Screenshot } from "common/interfaces";
import contoller from "assets/controller.svg";
import clsx from "clsx";

interface ScreenshotsProps {
  screenshots: Screenshot[];
}

export const Screenshots = ({ screenshots }: ScreenshotsProps) => {
  const [selected, setSelected] = useState(0);

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  return (
    <div className={classes.container}>
      <div className={classes.selected}>
        <Image
          src={screenshots[selected] ? screenshots[selected].image : contoller}
          alt="screenshot"
          layout="fill"
        />
      </div>
      <div className={classes.screenshots}>
        {screenshots.map((screenshot, index) => (
          <div className={classes.screenshot} key={screenshot.id}>
            <Image
              className={clsx(selected === index && classes.selected)}
              key={index}
              src={screenshot.image}
              alt="screenshot"
              layout="fill"
              objectFit="cover"
              onClick={handleSelect.bind(null, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
