import { IBaseFilter } from "../types/api";
import {
  IGame,
  IGameCharacter,
  IGameStaff,
  IReview,
} from "../types/game";
import { IList } from "../types/list";
import { TGamingStatus } from "../types/user";
import { del, get as apiGet, post, put } from "./api";

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

type ListFilter = IBaseFilter & {
  title?: string;
  includes?: string[];
  order?: {
    createdAt?: "asc" | "desc";
    updateAt?: "asc" | "desc";
  };
};

export async function get(query?: Filter) {
  const result = await apiGet<IGame[]>("/game", query);

  return result?.data;
}

export async function getById(id: string, includes?: string[]) {
  const result = await apiGet<IGame>(`/game/${id}`, { includes });

  return result?.data;
}

export async function getReviews(
  id: string,
  query?: Omit<Filter, "title" | "order" | "title">
) {
  const result = await apiGet<IReview[]>(`/game/${id}/reviews`, query);

  return result?.data;
}

export async function getCharacters(
  id: string,
  query?: Omit<Filter, "title" | "order"> & {
    search?: string;
  }
) {
  const result = await apiGet<IGameCharacter[]>(
    `/game/${id}/characters`,
    query
  );

  return result?.data;
}

export async function getStaff(
  id: string,
  query?: Omit<Filter, "title" | "order"> & {
    search?: string;
  }
) {
  const result = await apiGet<IGameStaff[]>(`/game/${id}/staff`, query);

  return result?.data;
}

export async function getListStatus(id: string) {
  const result = await apiGet<{
    status: string;
    score: number;
  }>(`/game/${id}/status`);

  return result?.data;
}

export async function addToMyList(
  id: string,
  status: TGamingStatus
) {
  const result = await post(`/game/${id}/status`, {
    status,
  });

  return result?.data;
}

export async function updateMyList(
  id: string,
  data: {
    status?: TGamingStatus;
    score?: number;
  }
) {
  const result = await put(`/game/${id}/status`, data);

  return result?.data;
}

export async function removeFromMyList(id: string) {
  const result = await del(`/game/${id}/status`);

  return result?.data;
}

export async function addToList(id: string, listId: string) {
  const result = await post(`/game/${id}/list/${listId}`);

  return result?.data;
}

export async function lists() {
  const result = await apiGet<IList[]>("/game/lists");

  return result?.data;
}

export const gameService = {
  get,
  getById,
  getReviews,
  getCharacters,
  getStaff,
  getListStatus,
  addToMyList,
  addToList,
  updateMyList,
  removeFromMyList,
  lists,
};
