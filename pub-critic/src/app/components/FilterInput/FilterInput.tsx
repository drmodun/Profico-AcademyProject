"use client";

import { useState } from "react";
import classes from "./FilterInput.module.scss";

interface FilterInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FilterInput = ({ label, value, onChange }: FilterInputProps) => {
  return (
    <div className={classes.filterInput}>
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        id={label}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
