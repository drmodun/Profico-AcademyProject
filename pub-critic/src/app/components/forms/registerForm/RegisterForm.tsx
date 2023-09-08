"use client";
import { useState } from "react";
import classes from "components/forms/Form.module.scss";
import Input from "components/input";
import namePic from "assets/user.svg";
import bio from "assets/Show.svg";
import emailPic from "assets/Email.svg";
import show from "assets/Show.svg";
import hide from "assets/Hide.svg";

export const RegisterForm = () => {
  const [name, setName] = useState<string>();
  const [descrtiption, setDescription] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [confirmPassword] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <div className={classes.form}>
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
            setPassword(e.target.value)
          }
          type="password"
          icon1={show}
          icon2={hide}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};