export interface IPagination {
  total: number;
  limit: number;
  next: number;
  prev: number;
}

export interface IApiResponse<T = any> {
  result: "ok" | "error";
  attributes: T;
  pagination: IPagination;
}

export interface IBaseFilter {
  limit?: number;
  offset?: number;
}
