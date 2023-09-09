export const baseURL = "https://easy-puce-octopus-tam.cyclic.cloud";

export const setJWT = (token: string) => {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("time", new Date().toString());
};
