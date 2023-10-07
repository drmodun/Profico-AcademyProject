//export const baseURL = "https://tricky-dove-pullover.cyclic.app";
export const baseURL = "https://api-pub-critic.fly.dev"; //if the other one is down

export const setJWT = (token: string) => {
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("time", new Date().toString());
};

export interface Favourite {
  userId: number;
  gameId: number;
  genres: string[];
}
