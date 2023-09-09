export const baseURL = "https://healthy-undershirt-bull.cyclic.cloud";

export let jwt = localStorage.getItem("jwtToken");

export const setJWT = (token: string) => {
  jwt = token;
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("time", new Date().toString());
};
