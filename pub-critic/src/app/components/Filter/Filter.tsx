"use client";
import { useEffect, useState } from "react";
import classes from "./Filter.module.scss";
import Dropdown from "components/Dropdown";
import { Genre, Platform } from "api/GamesShared";
import { FilterProps } from "api/GamesApi";
import Slider from "react-slider";
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
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(100);

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
        <div className={classes.section}>
          <span>Rating</span>
          <div className={classes.ratings}>
            <span>{minRating}</span>
            <span>{maxRating}</span>
          </div>
          <Slider
            className={classes.slider}
            thumbClassName={classes.thumb}
            trackClassName={classes.track}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            value={[minRating, maxRating]}
            max={100}
            min={0}
            onChange={(value) => {
              setMinRating(value[0]);
              setMaxRating(value[1]);
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
