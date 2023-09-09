import { useState } from "react";
import classes from "./EditableUserInfo.module.scss";
import Input from "components/input";
import user from "assets/user.svg";
import show from "assets/show.svg";

export const EditableUserInfo = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*if (name && email && bio) {
        const response = await updateUserInfo(name, email, bio);
    }*/
    console.log(`Name: ${name} Email: ${email} Bio: ${bio}`);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          label="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
          value={name}
          icon1={user}
        />
        <Input
          label="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
          value={email}
          icon1={show}
        />
        <Input
          label="Bio"
          name="bio"
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          type="text"
          value={bio}
          icon1={show}
        />
        <button className={classes.submit} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
