import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
import type {
  Page,
  ResultSuccess,
  ExpertOptions,
  searchOptions,
  searchExpertOptions,
  searArticleOptions,
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

// 获取文章点击数
export const searchArticleClick = (articleId: number, config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess<searArticleOptions>>(
    `/tech/article/click/${articleId}`,
    {},
    config,
  );
};

// 记录文章点击数
export const recordArticleClick = (articleId: number, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess>(
    `/tech/article/click/record?articleId=${articleId}`,
    {},
    config,
  );
};
