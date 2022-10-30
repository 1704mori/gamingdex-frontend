import { TOKEN_KEY } from "../helpers/consts";
import jwtDecode from "jwt-decode";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { get, post } from "./api";
import { IApiResponse } from "../types/api";
import { IUser } from "../types/user";

export function getToken(cookies = false) {
  if (cookies) {
    return parseCookies()[TOKEN_KEY];
  }

  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);

  const decodedToken = jwtDecode(token) as any;

  setCookie(undefined, TOKEN_KEY, token, {
    expires: new Date((decodedToken.exp as number) * 1000),
    path: "/",
  });
}

export async function me() {
  const result = await get("/auth/me");

  return result?.data as IApiResponse<IUser>;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  destroyCookie(undefined, TOKEN_KEY);
}

export async function login(email: string, password: string) {
  const result = await post("/auth/login", { email, password });

  return result?.data as IApiResponse<{
    accessToken: string;
  }>;
}

export async function register(data: {
  username: string;
  email: string;
  password: string;
}) {
  const result = await post("/auth/register", data);

  return result?.data as IApiResponse<IUser>;
}

export const authService = {
  getToken,
  setToken,
  me,
  logout,
  login,
  register,
};
