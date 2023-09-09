"use client";
import { useState } from "react";
import classes from "components/forms/Form.module.scss";
import Input from "components/input";
import emailPic from "assets/Email.svg";
import show from "assets/Show.svg";
import hide from "assets/Hide.svg";
import { loginUser } from "api/UserApi";

export const LoginForm = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !email) {
      alert("Please fill in all fields");
      return;
    }

    const user = {
      password,
      email,
    };

    const response = await loginUser(user);
    if (response) {
      alert("Login successful");
      window.location.href = "/";
      return;
    }
    alert("Login failed");
  };
  return (
    <div className={classes.form}>
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
          Don't have an account? <a href="/register">Register</a>
        </span>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
