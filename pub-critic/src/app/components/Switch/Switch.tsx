"use client";
import React, { useState } from "react";
import chevron_down from "assets/chevron-down.svg";
import chevron_up from "assets/chevron-up.svg";
import classes from "./Switch.module.scss";
import Image from "next/image";

interface Props {
  options: Option[];
  onSwitch: (value: number | string) => void;
}

export const Switch: React.FC<Props> = ({ options, onSwitch }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].label
  );

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <button className={classes.open} onClick={toggleVisible}>
          {selectedOption}
          {visible ? (
            <Image src={chevron_up} alt="close" />
          ) : (
            <Image src={chevron_down} alt="close" />
          )}
        </button>
      </div>
      {visible && (
        <div className={classes.options}>
          {options.map((option) => (
            <button
              key={option.label}
              className={classes.option}
              onClick={() => {
                setVisible(false);
                setSelectedOption(option.label);
                onSwitch(option.value);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
