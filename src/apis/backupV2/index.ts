import type { BackupV2Item, ResultSuccess } from '@/types';
import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
export const createBackup = (params: BackupV2Item, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess>('/tech/api/v2/backup/create', params, config);
};

export const getBackupList = (config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess<BackupV2Item[]>>(
    '/tech/api/v2/backup/batch/list',
    undefined,
    config,
  );
};

export const restoreBackup = (backupId: string, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess>('/tech/api/v2/backup/restore', { backupId }, config);
};

export const deleteBackup = (params: string, config?: AxiosRequestConfig) => {
  return request.delete<ResultSuccess>('/tech/api/v2/backup/batch/' + params, undefined, config);
};
