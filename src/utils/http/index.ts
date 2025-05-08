/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UploadFileParams } from '@/types';
import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { useMessage } from 'naive-ui';

type ResultSuccess<T = any> = {
  code: number;
  message: string;
  result?: T;
};
const baseURL = import.meta.env.VITE_BASEURL;
class DefAxios {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 10 * 1000,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    });
    this.setupInterceptors();
  }

  get<T = any>(url: string, data: any, axiosReqConfig?: AxiosRequestConfig): Promise<T> {
    return this.request(url, data, { ...axiosReqConfig, method: 'GET' });
  }
  post<T = any>(url: string, data: any, axiosReqConfig?: AxiosRequestConfig): Promise<T> {
    return this.request(url, data, { ...axiosReqConfig, method: 'POST' });
  }
  put<T = any>(url: string, data: any, axiosReqConfig?: AxiosRequestConfig): Promise<T> {
    return this.request(url, data, { ...axiosReqConfig, method: 'PUT' });
  }
  delete<T = any>(url: string, data: any, axiosReqConfig?: AxiosRequestConfig): Promise<T> {
    return this.request(url, data, { ...axiosReqConfig, method: 'DELETE' });
  }
  path<T = any>(url: string, data: any, axiosReqConfig?: AxiosRequestConfig): Promise<T> {
    return this.request(url, data, { ...axiosReqConfig, method: 'PATH' });
  }
  head<T = any>(url: string, data: any, axiosReqConfig?: AxiosRequestConfig): Promise<T> {
    return this.request(url, data, { ...axiosReqConfig, method: 'HEAD' });
  }
  uploadFile<T = any>(
    url: string,
    params: UploadFileParams,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';
    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }
    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }
    return this.request(url, formData, {
      ...config,
      method: 'POST',
      headers: {
        'Content-type': 'multipart/form-data;charset=UTF-8',
      },
    });
  }
  request<T = any>(url: string, data: any, config: AxiosRequestConfig): Promise<T> {
    const conf: AxiosRequestConfig = JSON.parse(JSON.stringify(config));
    conf.url = url;
    if (conf.method === 'GET') {
      conf.params = data;
    } else {
      conf.data = data;
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<ResultSuccess>>(conf)
        .then((res: AxiosResponse<ResultSuccess>) => {
          resolve(res.data as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        });
    });
  }

  private setupInterceptors() {
    /**
     * TODO: 拦截器
     * 1. 请求拦截器
     * 2. 响应拦截器
     * 3. 响应拦截器错误处理
     */
    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data.code === -1) {
          useMessage().error(response.data.msg);
        }
        return response;
      },
      (error: AxiosError) => {
        useMessage().error(error.message);
      },
    );
  }
}

export default new DefAxios();
