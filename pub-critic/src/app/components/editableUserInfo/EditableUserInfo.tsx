import { useState } from "react";
import classes from "./EditableUserInfo.module.scss";
import Input from "components/input";
import user from "assets/user.svg";
import show from "assets/Show.svg";
import { deleteUser, editMe } from "api/UserApi";

interface EditableUserInfoProps {
  initName: string;
  initEmail: string;
  initBio: string;
  getMe: Function;
}

export const EditableUserInfo = (
  { initName, initEmail, initBio, getMe }: EditableUserInfoProps = {
    initName: "Name",
    initEmail: "Email",
    initBio: "Bio",
    getMe: () => {},
  }
) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*if (name && email && bio) {
        const response = await updateUserInfo(name, email, bio);
    }*/
    console.log(`Name: ${name} Email: ${email} Bio: ${bio}`);
    const newUser = {
      name: name || initName,
      email: email || initEmail,
      bio: bio || initBio,
    };
    const update = await editMe(newUser);
    if (update) {
      alert("User info updated");
      getMe();
    }
    console.log(update);
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          label="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder={initName}
          type="text"
          value={name}
          icon1={user}
        />
        <Input
          label="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={initEmail}
          type="text"
          value={email}
          icon1={show}
        />
        <Input
          label="Bio"
          name="bio"
          onChange={(e) => setBio(e.target.value)}
          placeholder={initBio}
          type="text"
          value={bio}
          icon1={show}
        />
        <button className={classes.submit} type="submit">
          Save
        </button>
      </form>
      <button className={classes.deleteButton} onClick={deleteUser}>
        <p>Delete Account</p>
      </button>
    </div>
  );
};
