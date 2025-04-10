import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
type PageSave = {
  code: string;
  data: string;
  msg: string;
};
export const savePage = (data: PageSave, config?: AxiosRequestConfig) => {
  return request.post<PageSave>('/tech/article/save', data, config);
};
