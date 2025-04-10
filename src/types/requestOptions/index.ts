/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResultSuccess<T = any> {
  code: number;
  msg: string;
  data?: T;
}
