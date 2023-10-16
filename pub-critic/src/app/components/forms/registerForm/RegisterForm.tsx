"use client";
import { useState } from "react";
import classes from "components/forms/Form.module.scss";
import Input from "components/input";
import namePic from "assets/user.svg";
import bio from "assets/Show.svg";
import emailPic from "assets/Email.svg";
import show from "assets/Show.svg";
import hide from "assets/Hide.svg";
import { postUser } from "api/UserApi";
import Link from "next/link";
import { set } from "react-hook-form";
import Modal from "utils/Modal";

enum RegisterModalText {
  Success,
  Failure,
  PasswordMismatch,
  Empty,
}

export const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [descrtiption, setDescription] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<RegisterModalText>(
    RegisterModalText.Empty
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setModalOpen(true);
      setModalText(RegisterModalText.PasswordMismatch);
      return;
    }

    if (
      !name ||
      !descrtiption ||
      !password ||
      !email ||
      !confirmPassword ||
      !password
    ) {
      setModalOpen(true);
      setModalText(RegisterModalText.Empty);
      return;
    }

    const user = {
      name,
      bio: descrtiption,
      password,
      email,
    };
    const response = await postUser(user);
    if (response) {
      setModalOpen(true);
      setModalText(RegisterModalText.Success);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1750);
      return;
    }
    setModalOpen(true);
    setModalText(RegisterModalText.Failure);
  };
  return (
    <div className={classes.form}>
      <Modal
        open={modalOpen}
        close={() => setModalOpen(false)}
        title={
          modalText === RegisterModalText.Success
            ? "Registration succesful"
            : modalText === RegisterModalText.Failure
            ? "Registration Failed"
            : "Invalid registration submission"
        }
        text={
          modalText === RegisterModalText.Success
            ? "You have been registered, you will be redirected to the login page soon"
            : modalText === RegisterModalText.Failure
            ? "Registration failed, please try again later"
            : "Please fill in all fields  and make sure your passwords match"
        }
      />
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          type="text"
          icon1={namePic}
        />
        <Input
          label="Description"
          name="description"
          placeholder="Enter your description"
          value={descrtiption}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          type="text"
          icon1={bio}
        />
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
        <Input
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
          type="password"
          icon1={show}
          icon2={hide}
        />
        <span className={classes.Alternate}>
          Already have an account? <Link href="/login">Login</Link>
        </span>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
