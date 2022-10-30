import { IApiResponse, IBaseFilter } from "../types/api";
import { IGame, IGameCharacter, IGameStaff, IReview } from "../types/game";
import { get as apiGet } from "./api";

type Filter = IBaseFilter & {
  includes?: string[];
  title?: string;
  order?: {
    title?: "asc" | "desc";
    score?: "asc" | "desc";
    createdAt?: "asc" | "desc";
    updateAt?: "asc" | "desc";
  };
};

export async function get(query?: Filter) {
  const result = await apiGet("/game", query);

  return result?.data.data as IApiResponse<IGame[]>;
}

export async function getById(id: string, includes?: string[]) {
  const result = await apiGet(`/game/${id}`, { includes });

  console.dir(result, {
    depth: null,
  });

  return result?.data as IApiResponse<IGame>;
}

export async function getReviews(
  id: string,
  query?: Omit<Filter, "title" | "order">
) {
  const result = await apiGet(`/game/${id}/reviews`, query);

  return result?.data as IApiResponse<IReview[]>;
}

export async function getCharacters(
  id: string,
  query?: Omit<Filter, "title" | "order">
) {
  const result = await apiGet(`/game/${id}/characters`, query);

  return result?.data as IApiResponse<IGameCharacter[]>;
}

export async function getStaff(
  id: string,
  query?: Omit<Filter, "title" | "order">
) {
  const result = await apiGet(`/game/${id}/staff`, query);

  return result?.data as IApiResponse<IGameStaff[]>;
}

export const gameService = {
  get,
  getById,
  getReviews,
  getCharacters,
  getStaff,
};
