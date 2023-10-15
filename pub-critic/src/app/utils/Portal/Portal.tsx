"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal: React.FC<PropsWithChildren> = ({ children }) => {
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
  };

  const mount = () => {
    setMounted(true);
  };

  return mounted
    ? createPortal(children, document.querySelector("#portal"))
    : null;
};

export default Portal;
