import { TOKEN_KEY } from "../helpers/consts";
import jwtDecode from "jwt-decode";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { get, post } from "./api";
import { IApiResponse } from "../types/api";
import { IUser } from "../types/user";
import { resolvePromise } from "../helpers/common";

export function getToken() {
  return parseCookies()[TOKEN_KEY];
}

export function setToken(token: string) {
  const decodedToken = jwtDecode(token) as any;

  setCookie(undefined, TOKEN_KEY, token, {
    expires: new Date((decodedToken.exp as number) * 1000),
    path: "/",
    sameSite: "Strict",
  });
}

export async function me() {
  const result = await get("/auth/me");

  return result?.data as IApiResponse<IUser>;
}

export function logout() {
  destroyCookie(undefined, TOKEN_KEY);
}

export async function _login(email: string, password: string) {
  const result = await post<{ accessToken: string }>("/auth/login", { email, password });

  return result?.data
}

export async function login(email: string, password: string): Promise<{
  user: IUser | null;
  error: any
}> {
  const [result, err] = await resolvePromise(
    _login(email, password)
  );

  if (err) {
    return {
      user: null,
      error: err.data
    }
  }

  authService.setToken(result?.data.attributes.accessToken as string);

  const [user, userErr] = await resolvePromise(authService.me());
  if (userErr) {
    return {
      error: userErr.data,
      user: null
    };
  }

  return {
    user: user.data.attributes,
    error: null
  }
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
