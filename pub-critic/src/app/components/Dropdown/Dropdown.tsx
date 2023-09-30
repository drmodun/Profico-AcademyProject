"use client";
import React, { useEffect, useState } from "react";
import classes from "./Dropdown.module.scss";
import clsx from "clsx";

interface DropdownProps {
  options: Option[];
  onSelect: (value: string | number) => void;
  cancel?: boolean;
  closer?: Function;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  cancel,
  closer,
}) => {
  const [searchTerm, setSearchTerm] = useState<string | number>("");
  const [selected, setSelected] = useState<string | number>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>("Search");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (value: string | number, label: string) => {
    setSelected(value);
    setSearchTerm("");
    setPlaceholder(label);
    onSelect(value);
    setVisible(false);
  };

  const toggleVisible = () => {
    closer && closer();
    setVisible((prev) => !prev);
  };

  const handleReset = () => {
    setSelected("");
    setSearchTerm("");
    setPlaceholder("Search");
    onSelect("");
    setVisible(false);
  };

  useEffect(() => {
    setVisible(false);
  }, [cancel]);

  return (
    <div className={classes.dropdown}>
      <div
        className={clsx(classes.top, visible && classes.active)}
        onClick={toggleVisible}
      >
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      <div className={visible ? classes.menu : classes.hidden}>
        {<li key="" onClick={handleReset}></li>}
        {options
          .filter((option) =>
            option.label
              .toLowerCase()
              .includes(searchTerm.toString().toLowerCase())
          )
          .splice(0, 10)
          .map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </li>
          ))}
      </div>
    </div>
  );
};
