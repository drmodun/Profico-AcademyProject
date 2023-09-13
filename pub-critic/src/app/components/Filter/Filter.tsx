"use client";
import { useEffect, useState } from "react";
import classes from "./Filter.module.scss";
import Dropdown from "components/Dropdown";
import { Genre, Platform } from "api/GamesShared";
import { FilterProps } from "api/GamesApi";
import FilterInput from "components/FilterInput";

interface Props {
  filter?: (value: FilterProps) => void;
  genres: Genre[];
  platforms: Platform[];
}

export const Filter = ({
  filter = (value: FilterProps) => {
    console.log(value);
  },
  genres,
  platforms,
}: Props) => {
  const [genre, setGenre] = useState<number | undefined>();
  const [platform, setPlatform] = useState<number | undefined>();
  const [name, setName] = useState<string>("");
  const [genreCloser, setGenreCloser] = useState<boolean>(false);
  const [platformCloser, setPlatformCloser] = useState<boolean>(false);

  const handleGenreCloser = () => {
    setPlatformCloser((prev) => !prev);
  };

  const handlePlatformCloser = () => {
    setGenreCloser((prev) => !prev);
  };

  //add better ways to filtrate

  return (
    <div className={classes.container}>
      <div className={classes.filter}>
        <h2>Filter</h2>
        <div className={classes.section}>
          <FilterInput
            label="Name"
            placeholder="Ime"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.section}>
          <span>Genre</span>
          <Dropdown
            cancel={genreCloser}
            closer={handleGenreCloser}
            options={genres.map((genre) => ({
              label: genre.name,
              value: genre.id,
            }))}
            onSelect={(value) => {
              setGenre(value as number);
            }}
          />
        </div>
        <div className={classes.section}>
          <span>Platform</span>
          <Dropdown
            cancel={platformCloser}
            closer={handlePlatformCloser}
            options={platforms.map((platform) => ({
              label: platform.name,
              value: platform.id,
            }))}
            onSelect={(value) => {
              setPlatform(value as number);
            }}
          />
        </div>
        <button
          className={classes.button}
          onClick={() =>
            filter({
              genre: genre ? genre : undefined,
              platform: platform ? platform : undefined,
              name: name ? name : undefined,
              page: 1,
              pageSize: 10,
            })
          }
        >
          Filtriraj
        </button>
      </div>
    </div>
  );
};
