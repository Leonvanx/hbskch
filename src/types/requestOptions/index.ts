export interface ResultSuccess<T> {
  code: string;
  msg: string;
  data?: T;
}
