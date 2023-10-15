"use client";
import React, { useEffect, useState } from "react";
import classes from "./Dropdown.module.scss";
interface Option {
  label: string;
  value: string | number;
}

interface Props {
  options: Option[];
  onSelect: (value: string | number) => void;
  cancel?: boolean;
  closer?: Function;
  initSelected?: string | number;
}

export const Dropdown = ({
  options,
  onSelect,
  cancel,
  closer,
  initSelected,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState<string | number>("");
  const [selected, setSelected] = useState<string | number>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>(
    options.find((option) => option.value == initSelected)?.label || "Search"
  );

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

  useEffect(() => {
    setVisible(false);
  }, [cancel]);

  return (
    <div className={classes.dropdown}>
      <div
        className={`${visible ? classes.active : ""} ${classes.top} `}
        onClick={() => {
          closer && closer();
          setVisible((prev) => !prev);
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      <div className={visible ? classes.menu : classes.hidden}>
        {
          <li
            key=""
            onClick={() => {
              setSelected("");
              setSearchTerm("");
              setPlaceholder("Search");
              onSelect("");
              setVisible(false);
            }}
          ></li>
        }
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
