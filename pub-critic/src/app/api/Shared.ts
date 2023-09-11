export const baseURL = "https://tricky-dove-pullover.cyclic.app";
export const altBaseURL = "https://pub-critic.fly.dev"; //if the other one is down

export const setJWT = (token: string) => {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("time", new Date().toString());
};
