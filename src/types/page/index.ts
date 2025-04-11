export interface Page {
  content?: string;
  coverImage?: string;
  id?: number;
  pathName?: string;
  searchWord?: string;
  menuId?: number;
  orderNum?: number;
  status?: number;
  summary?: number;
  updateTime?: string;
  title?: string;
}
export interface PageOptions {
  page?: number;
  menuId?: number;
  size?: number;
}
export interface searchOptions<T> {
  current?: number;
  pages?: number;
  records: Array<T>;
  size?: number;
  total?: number;
}
