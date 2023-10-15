"use client";
import React, { useState } from "react";
import chevron_down from "assets/chevron-down.svg";
import chevron_up from "assets/chevron-up.svg";
import classes from "./Switch.module.scss";
import Image from "next/image";
import { Capitalise } from "utils/stringCapitiliser";
import { Option } from "common/interfaces";

interface SwitchProps {
  options: Option[];
  onSwitch: (value: number | string) => void;
  initValue?: Option;
}


export const Switch: React.FC<SwitchProps> = ({
  options,
  onSwitch,
  initValue,
}: SwitchProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    Capitalise(initValue?.label) || options[0].label
  );

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <button className={classes.open} onClick={toggleVisible}>
          {selectedOption}
          <Image src={visible ? chevron_up : chevron_down} alt="close" />
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
