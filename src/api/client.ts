import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface Data {
  name: string;
  email: string;
}

const defaultConfig: AxiosRequestConfig = {
  baseURL:
    "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};

class APIClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor(config: AxiosRequestConfig = {}) {
    this.instance = axios.create({ ...defaultConfig, ...config });
    this.baseURL = this.instance.defaults.baseURL || "";

    this.instance.interceptors.request.use((config) => {
      if (config.url && config.url.startsWith("/")) {
        config.url = this.baseURL + config.url;
      }
      return config;
    });
  }

  private getFullUrl(url: string): string {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return url.startsWith("/") ? this.baseURL + url : `${this.baseURL}/${url}`;
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    const fullUrl = this.getFullUrl(config.url || "");
    const response = await this.instance.request<T>({
      ...config,
      url: fullUrl,
    });
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: Data,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({ ...config, method: "POST", url, data });
  }
}

const apiClient = new APIClient();
export default apiClient;
