import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
import type { PageOptions, ResultSuccess, searchOptions, Menu } from '@/types';

export const savePage = (params: PageOptions, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess>('/tech/article/save', params, config);
};

export const searchPage = (params: PageOptions, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<searchOptions<PageOptions>>>('/tech/article/list', params, config);
};
// 获取所有菜单
export const searchMenu = (params?: Menu, config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess<Menu[]>>('/tech/menu/tree', params, config);
};
// 删除菜单
export const deleteMenu = (id: number, config?: AxiosRequestConfig) => {
  return request.delete<ResultSuccess<{ code: number; message: string }>>(`/tech/menu/${id}`, {}, config);
};
