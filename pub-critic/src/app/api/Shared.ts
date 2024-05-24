//export const baseURL = "https://agreeable-puce-suit.cyclic.app";
export const baseURL = "https://pub-critic.fly.dev"; //if the other one is down

export const setJWT = (token: string) => {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("time", new Date().toString());
};
