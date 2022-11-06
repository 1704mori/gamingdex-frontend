export interface IPagination {
  total: number;
  limit: number;
  next: number;
  prev: number;
}

export interface IApiResponse<T = any> {
  data: T;
  result: "ok" | "error";
  pagination: IPagination;
}

export interface IBaseFilter {
  limit?: number;
  offset?: number;
}
