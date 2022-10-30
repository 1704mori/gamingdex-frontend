import { IApiResponse, IBaseFilter } from "../types/api";
import { IList } from "../types/list";
import { IUserActivity } from "../types/user";
import { get, post, put } from "./api";

type Filter = IBaseFilter & {
  includes?: string[];
  title?: string;
  order?: {
    createdAt?: "asc" | "desc";
    updateAt?: "asc" | "desc";
  };
};

export async function list(query?: Filter) {
  const result = await get<IApiResponse<IUserActivity[]>>("/list", query);

  return result?.data;
}

export async function create(
  data?: Partial<IList & { games: { gameId: string; description?: string }[] }>
) {
  const result = await post("/list", data);

  return result?.data as IApiResponse<IList>;
}

export async function update(
  id: string,
  data?: Partial<IList & { games: { gameId: string; description?: string }[] }>
) {
  const result = await put(`/list/${id}`, data);

  return result?.data as IApiResponse<IList>;
}

export const listService = {
  list,
  create,
  update,
};
