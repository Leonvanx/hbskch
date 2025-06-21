import type { BackupItem, ResultSuccess } from '@/types';
import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
export const createBackup = (config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess>('/tech/api/backup/create', null, config);
};

export const getBackupList = (config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess<BackupItem[]>>('/tech/api/backup/list', null, config);
};

export const restoreBackup = (params: { timestamp: string }, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess>('/tech/api/backup/restore', params, config);
};
