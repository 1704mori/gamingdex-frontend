export const ROUTES = {
  home: "/",
  games: {
    index: "/games",
    random: "/games/random",
  },
  community: {
    lists: "/lists",
  },
  login: "/login",
  register: "/register",
  profile: {
    index: "/profile",
    lists: "/profile/:username?tab=lists",
  },
  settings: "/settings",
};

export const TOKEN_KEY = "g:access_token";
