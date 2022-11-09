import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { authService } from "./auth";

import { API_URL } from "@/settings";
import { IApiResponse } from "../types/api";

export async function get<T = unknown>(
  url: AxiosRequestConfig["url"],
  params?: AxiosRequestConfig["params"],
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<IApiResponse<T>> | undefined> {
  return request<T>({ url, method: "GET", params, headers });
}

export async function post<T = unknown>(
  url: AxiosRequestConfig["url"],
  data?: AxiosRequestConfig["data"],
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<IApiResponse<T>> | undefined> {
  return request<T>({ url, method: "POST", data, headers });
}

export async function put<T = unknown>(
  url: AxiosRequestConfig["url"],
  data?: AxiosRequestConfig["data"],
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<IApiResponse<T>> | undefined> {
  return request<T>({ url, method: "PUT", data, headers });
}

export async function del<T = any>(
  url: AxiosRequestConfig["url"],
  data?: AxiosRequestConfig["data"],
  params?: AxiosRequestConfig["params"],
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<IApiResponse<T>> | undefined> {
  return request<T>({ url, method: "DELETE", data, params, headers });
}

export async function request<T = any>(
  options: AxiosRequestConfig
): Promise<AxiosResponse<IApiResponse<T>> | undefined> {
  try {
    return await axios({
      ...options,
      ...options.params,
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authService.getToken(true)}`,
        ...options.headers,
      },
    });
  } catch (err: any) {
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

    const code = data?.message || "";
    const message = data?.error || "";
    const errors = data?.errors || [];
    const errorsData = data?.data?.errors || [];

    if (code) {
      throw {
        code,
        message,
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
