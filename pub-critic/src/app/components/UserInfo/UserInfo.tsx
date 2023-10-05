import { User } from "api/UserApi";

interface UserInfoProps {
  user: User;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div>
      <h1>User info</h1>
      <p>Username: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
};
