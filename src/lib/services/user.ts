import { IApiResponse, IBaseFilter } from "../types/api";
import { IUserActivity } from "../types/user";
import { get } from "./api";

export async function activities(query?: IBaseFilter & { includes?: string[] }) {
  const result = await get<IApiResponse<IUserActivity[]>>("/user/activities", query);

  return result?.data;
}

export const userService = {
  activities,
};
