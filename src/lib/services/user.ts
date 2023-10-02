import { IBaseFilter } from "../types/api";
import { IUser, IUserActivity, IUserGame } from "../types/user";
import { get } from "./api";

export async function activities(query?: IBaseFilter & { includes?: string[] }) {
  const result = await get<IUserActivity[]>("/user/activities", query);

  return result?.data
}

export async function games(id?: string, query?: IBaseFilter & { includes?: string[] }) {
  const result = await get<IUserGame[]>(`/user/${id}/games`, query);

  return result?.data
}

type History = {
  day: string;
  value: number;
}

export async function history(id: string) {
  const result = await get<History[]>(`/user/${id}/history`);

  return result?.data
}

export async function profile(username: string) {
  const result = await get<IUser>(`/user/${username}`)
  return result?.data;
}

export const userService = {
  activities,
  history,
  games,
  profile,
};
