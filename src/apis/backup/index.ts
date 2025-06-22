import type { BackupItem, ResultSuccess } from '@/types';
import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
export const createBackup = (config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess>('/tech/api/backup/create', undefined, config);
};

export const getBackupList = (config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess<BackupItem[]>>('/tech/api/backup/list', undefined, config);
};

export const restoreBackup = (params: string, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess>(
    '/tech/api/backup/restore?timestamp=' + params,
    undefined,
    config,
  );
};

export const deleteBackup = (params: string, config?: AxiosRequestConfig) => {
  return request.delete<ResultSuccess>(
    '/tech/api/backup/del?timestamp=' + params,
    undefined,
    config,
  );
};
