import { useState } from "react";
import classes from "./EditableUserInfo.module.scss";
import Input from "components/input";
import user from "assets/user.svg";
import show from "assets/Show.svg";
import { deleteUser, editMe, logoutUser } from "api/UserApi";
import useUser from "utils/UserContext";
import Modal from "utils/Modal";

interface EditableUserInfoProps {
  initName: string;
  initEmail: string;
  initBio: string;
  openModal?: () => void;
  setModalText?: (text: number) => void;
}

export const EditableUserInfo = (
  {
    initName,
    initEmail,
    initBio,
    openModal,
    setModalText,
  }: EditableUserInfoProps = {
    initName: "Name",
    initEmail: "Email",
    initBio: "Bio",
    openModal: () => {},
    setModalText: () => {},
  }
) => {
  const [name, setName] = useState<string>(initName);
  const [email, setEmail] = useState<string>(initEmail);
  const [bio, setBio] = useState<string>(initBio);

  const { user: localUser, setUser, logout } = useUser();

  const handleUserDelete = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete your account"
    );
    if (confirmation) {
      const response = await deleteUser();
      if (response) {
        openModal?.();
        setModalText?.(2);
        logout?.();
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Name: ${name} Email: ${email} Bio: ${bio}`);
    const newUser = {
      name: name || initName,
      email: email || initEmail,
      bio: bio || initBio,
    };
    const update = await editMe(newUser);
    if (update) {
      openModal?.();
      setModalText?.(1);
      setUser({
        ...localUser!,
        name: newUser.name,
        email: newUser.email,
        bio: newUser.bio,
      });
    }
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
      <button className={classes.deleteButton} onClick={handleUserDelete}>
        <p>Delete Account</p>
      </button>
    </div>
  );
};
