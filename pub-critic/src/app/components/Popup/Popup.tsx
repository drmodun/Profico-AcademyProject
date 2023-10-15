import { string } from "zod";
import classes from "./Popup.module.scss";

interface PopupProps {
  title: string;
  unMount: () => void;
  text: string;
}

export const Popup = ({ title, text, unMount }: PopupProps) => {
  return (
    <div className={classes.popup}>
      <div className={classes.popupInner}>
        <h1>{title}</h1>
        <p>{text}</p>
        <button onClick={unMount}>OK</button>
      </div>
    </div>
  );
};
