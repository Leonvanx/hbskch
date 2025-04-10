import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
import type { PageOptions, ResultSuccess, searchOptions } from '@/types';

export const savePage = (params: PageOptions, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess>('/tech/article/save', params, config);
};

export const searchPage = (params: PageOptions, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<searchOptions<PageOptions>>>('/tech/article/list', params, config);
};
// 获取所有菜单
export const searchMenu = (params?: PageOptions, config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess<searchOptions<PageOptions>>>('/tech/menu/tree', params, config);
};
