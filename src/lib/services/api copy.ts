import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { authService } from "./auth";

import { IApiResponse } from "../types/api";
import { API_URL } from "../../settings";

interface CustomResponse<T = any> extends Response {
  data: T;
}

export async function get<T = unknown>(
  url: Request["url"],
  params?: any,
  headers?: Request["headers"]
): Promise<CustomResponse<IApiResponse<T>> | undefined> {
  return request<T>({ url, method: "GET", params, headers });
}

export async function post<T = unknown>(
  url: Request["url"],
  data?: AxiosRequestConfig["data"],
  headers?: AxiosRequestConfig["headers"]
): Promise<CustomResponse<IApiResponse<T>> | undefined> {
  return request<T>({ url, method: "POST", body: data, headers });
}

export async function put<T = unknown>(
  url: Request["url"],
  data?: AxiosRequestConfig["data"],
  headers?: AxiosRequestConfig["headers"]
): Promise<CustomResponse<IApiResponse<T>> | undefined> {
  return request<T>({ url, method: "PUT", body: data, headers });
}

export async function del<T = any>(
  url: Request["url"],
  data?: AxiosRequestConfig["data"],
  params?: AxiosRequestConfig["params"],
  headers?: AxiosRequestConfig["headers"]
): Promise<CustomResponse<IApiResponse<T>> | undefined> {
  return request<T>({ url, method: "DELETE", body: data, params, headers });
}

export async function request<T = any>(
  options: Partial<Omit<Request, "headers">> & { params?: any; headers?: any }
): Promise<CustomResponse<IApiResponse<T>> | undefined> {
  try {
    const { params, ...rest } = options;

    let url = new URL(API_URL);

    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }

    const customHeaders = new Headers();
    if (rest.headers) {
      Object.keys(rest.headers).forEach((key) =>
        customHeaders.append(key, rest.headers[key])
      );
    }


    const response = await fetch({
      ...(rest as Request),
      url: url.origin,
      headers: customHeaders,
    });

    console.log(response)
    const json = await response.json();

    return json;
  } catch (err: any) {
    console.log(err)
    handleError(err);
  }
}

function handleError(err: AxiosError) {
  if (!err.response) {
    console.error(err);
    throw new Error("Erro desconhecido, tente novamente...");
  }

  const { status, config, data } = err.response as any;
  const { url } = config;

  if (status !== 401 || (status === 401 && url === "/auth/login")) {
    /*Sentry.captureException(err, {
      extra: {
        data: err?.config?.data,
        status: `${err?.response?.status} ${err?.response?.statusText}`,
        response: JSON.stringify(err?.response?.data),
      },
    });*/

    const message = data?.message || "";
    const errors = data?.errors || [];
    const errorsData = data?.data?.errors || [];

    if (message) {
      throw {
        message,
        error: data.error,
      };
    }

    if (!!errors.length && errors[0]) {
      throw new Error(errors[0].message);
    }

    if (!!errorsData.length && errorsData[0]) {
      throw new Error(errorsData[0].message);
    }

    throw new Error("Erro desconhecido, tente novamente...");
  }
}
