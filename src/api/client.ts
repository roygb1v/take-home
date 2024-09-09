import { AxiosRequestConfig } from "axios";

export const URL =
  "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

export const defaultConfig: AxiosRequestConfig = {
  baseURL: URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};
