import { User } from "common/interfaces";
import { getMe } from "./UserApi";

let accountInfo: User | null = null;

export const getAccountInfo = async () => {
  const jwt = localStorage.getItem("jwtToken");
  if (jwt === null) {
    return null;
  }

  const dateString = localStorage.getItem("time");
  if (dateString === null) {
    return null;
  }
  const date = new Date(dateString);
  if (new Date().getTime() - date.getTime() > 1000 * 60 * 60 * 8) {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("time");
    //pretty rough solution, will make it better with context later
  }
  if (accountInfo) {
    return accountInfo;
  }
  console.log("getting account info");

  const user = await getMe();
  console.log(user);
  accountInfo = user;
  return user;
};
