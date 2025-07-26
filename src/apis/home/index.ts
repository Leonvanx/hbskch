import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
import type {
  Page,
  ResultSuccess,
  ExpertOptions,
  searchOptions,
  Expert,
  searchExpertOptions,
} from '@/types';
// 查询子文章
export const searchPageById = (id: number, config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess<Page>>(`/tech/article/${id}`, {}, config);
};

// 专家库列表查询（配置字段）
export const searchExpertList = (params: ExpertOptions, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<searchOptions<searchExpertOptions>>>(
    `/tech/api/expert/experts`,
    params,
    config,
  );
};
