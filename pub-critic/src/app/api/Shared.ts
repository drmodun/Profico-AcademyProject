export const baseURL = "https://healthy-undershirt-bull.cyclic.cloud";

export const setJWT = (token: string) => {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("time", new Date().toString());
};
