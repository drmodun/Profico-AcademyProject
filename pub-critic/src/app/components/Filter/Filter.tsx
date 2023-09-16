"use client";
import { useEffect, useState } from "react";
import classes from "./Filter.module.scss";
import Dropdown from "components/Dropdown";
import { Genre, Platform } from "api/GamesShared";
import { FilterProps } from "api/GamesApi";
import Slider from "react-slider";
import FilterInput from "components/FilterInput";
import Link from "next/link";
import Switch from "components/Switch";

interface Props {
  filter?: (value: FilterProps) => void;
  genres: Genre[];
  platforms: Platform[];
  searchParams?: {
    search?: string;
    genre?: number;
    platform?: number;
    metacritic?: string;
    page?: number;
    pageSize?: number;
    ordering?: string;
  };
}

export const Filter = ({
  filter = (value: FilterProps) => {
    console.log(value);
  },
  genres,
  platforms,
  searchParams,
}: Props) => {
  const [genre, setGenre] = useState<number | undefined>(
    searchParams?.genre || undefined
  );
  const [platform, setPlatform] = useState<number | undefined>(
    searchParams?.platform || undefined
  );
  const [name, setName] = useState<string>(searchParams?.search || "");
  const [genreCloser, setGenreCloser] = useState<boolean>(false);
  const [platformCloser, setPlatformCloser] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(
    searchParams?.metacritic
      ? parseInt(searchParams.metacritic.split(",")[0])
      : 0
  );
  const [maxRating, setMaxRating] = useState<number>(
    searchParams?.metacritic
      ? parseInt(searchParams.metacritic.split(",")[1])
      : 100
  );
  const [sorting, setSorting] = useState<string>(searchParams?.ordering || "");

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
              value: genre.id!,
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
        <div className={classes.section}>
          <span>Order by</span>
          <div className={classes.sorting}>
            <Switch
              options={[
                { label: "None", value: "" },
                { label: "Name", value: "name" },
                { label: "Release", value: "released" },
                { label: "Metacritic", value: "metacritic" },
                { label: "Updated", value: "updated" },
              ]}
              onSwitch={(value) => setSorting(value as string)}
            />
            {sorting && (
              <Switch
                options={[
                  { label: "Ascending", value: "" },
                  { label: "Descending", value: "-" },
                ]}
                onSwitch={(value) =>
                  setSorting(
                    (prev) => (value as string) + prev.replace("-", "")
                  )
                }
              />
            )}
          </div>
        </div>
        <Link
          className={classes.button}
          href={{
            pathname: "/games",
            query: {
              genre: genre ? genre : undefined,
              platform: platform,
              search: name.length ? name : undefined,
              metacritic: minRating + "," + maxRating,
              page: 1,
              pageSize: 10,
              ordering: sorting ? sorting : undefined,
            },
          }}
          onClick={() =>
            filter({
              genre: genre ? genre : undefined,
              platform: platform ? platform : undefined,
              search: name ? name : undefined,
              metacritic: minRating + "," + maxRating,
              page: 1,
              pageSize: 10,
              ordering: sorting ? sorting : undefined,
            })
          }
        >
          Filtriraj
        </Link>
      </div>
    </div>
  );
};
