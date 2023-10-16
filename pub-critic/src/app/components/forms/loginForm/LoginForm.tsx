"use client";
import { useState } from "react";
import classes from "components/forms/Form.module.scss";
import Input from "components/input";
import emailPic from "assets/Email.svg";
import show from "assets/Show.svg";
import hide from "assets/Hide.svg";
import { loginUser } from "api/UserApi";
import Link from "next/link";
import Modal from "utils/Modal";
import { set } from "react-hook-form";

enum ModalText {
  Success,
  Failure,
  Empty,
}

export const LoginForm = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<ModalText>(ModalText.Empty);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !email) {
      setModalOpen(true);
      setModalText(ModalText.Empty);
      return;
    }

    const user = {
      password,
      email,
    };

    const response = await loginUser(user);
    if (response) {
      setModalOpen(true);
      setModalText(ModalText.Success);
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      return;
    }
    setModalOpen(true);
    setModalText(ModalText.Failure);
  };
  return (
    <div className={classes.form}>
      <Modal
        open={modalOpen}
        close={() => setModalOpen(false)}
        title={
          modalText === ModalText.Success
            ? "Login Succesful"
            : modalText === ModalText.Failure
            ? "Login failed"
            : "Invalid email or password"
        }
        text={
          modalText === ModalText.Success
            ? "Login successful, enjoy your stay"
            : modalText === ModalText.Failure
            ? "Login failed, the email or password is incorrect or the user does not exist"
            : "Please fill in all fields"
        }
      />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          type="email"
          icon1={emailPic}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          type="password"
          icon1={show}
          icon2={hide}
        />
        <span className={classes.Alternate}>
          Do not have an account? <Link href="/register">Register</Link>
        </span>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
