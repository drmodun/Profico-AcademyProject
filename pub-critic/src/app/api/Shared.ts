export const baseURL = "http://localhost:3030";

let jwt = localStorage.getItem("jwtToken");

export const setJWT = (token: string) => {
  jwt = token;
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("time", new Date().toString());
};
