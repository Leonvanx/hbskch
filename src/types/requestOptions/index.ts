/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResultSuccess<T = any> {
  code: string;
  msg: string;
  data?: T;
}
