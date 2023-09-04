import React from "react";
import cx from "clsx";

import styles from "./Hamburger.module.scss";

interface HamburgerProps {
  open: boolean;
  onToggle: () => void;
  classes?: {
    bar?: string;
  };
}

export const Hamburger: React.FC<HamburgerProps> = ({
  open,
  onToggle,
  classes,
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={cx(styles.Container, { [styles.Open]: open })}
  >
    <span className={styles.Label}>
      <span className={cx(styles.Bar, classes?.bar)} />
      <span className={cx(styles.Bar, classes?.bar)} />
      <span className={cx(styles.Bar, classes?.bar)} />
    </span>
  </button>
);
