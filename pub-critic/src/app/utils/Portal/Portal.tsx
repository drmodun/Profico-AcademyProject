"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./Portal.module.scss";

interface PortalProps {
  title: string;
  text: string;
  deMount: Function;
}

const Portal: React.FC<PortalProps> = ({ title, text, deMount }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    setMounted(true);

    return () => {
      document.documentElement.style.overflow = "";
      setMounted(false);
    };
  }, []);

  const unMount = () => {
    setMounted(false);
    deMount();
  };

  return mounted
    ? createPortal(
        <div id="#portal" className={classes.popup} onClick={unMount}>
          <div className={classes.popupInner}>
            <h1>{title}</h1>
            <p>{text}</p>
            <button onClick={unMount}>OK</button>
          </div>
        </div>,
        document.querySelector("#portal")!
      )
    : null;
};

export default Portal;
