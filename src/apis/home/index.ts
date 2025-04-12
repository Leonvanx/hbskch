import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
import type { Page, ResultSuccess } from '@/types';
// 查询子文章
export const searchPageById = (id: number, config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess<Page>>(`/tech/article/${id}`, {}, config);
};
