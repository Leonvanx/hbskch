/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResultSuccess<T = any> {
  code: number;
  msg: string;
  data?: T;
}
export interface UploadResult<T = any> extends ResultSuccess<T> {
  url: string;
}
export interface UploadFileParams {
  // Other parameters
  data?: any;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
