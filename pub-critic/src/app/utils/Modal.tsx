"use client";

import { useEffect, useState } from "react";
import Portal from "./Portal/Portal";

interface ModalProps {
  open: boolean;
  title: string;
  text: string;
  close?: Function;
}

const Modal = ({ open, title, text, close }: ModalProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(open);
    console.log(open);
  }, [open]);

  const handleDemount = () => {
    close?.();
  };
  return (
    modalOpen && (
      <div id="portal">
        <Portal text={text} title={title} deMount={handleDemount} />
      </div>
    )
  );
};

export default Modal;
