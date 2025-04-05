import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
type Test = {
    name: string;
    age: number;
};
export const testApi = (data: Test, config?: AxiosRequestConfig) => {
    return request.get<Test>('/test', data, config);
};
