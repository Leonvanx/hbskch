export interface PageOptions {
  content?: string;
  coverImage?: string;
  id?: number;
  subPath?: string;
  pathName?: string;
  searchWord?: string;
  isHomePage?: number;
  isPathPage?: number;
  menuId?: number;
  orderNum?: number;
  status?: number;
  summary?: string;
  updateTime?: string;
  title?: string;
  page?: number;
  size?: number;
}

export interface searchOptions<T> {
  current?: number;
  pages?: number;
  records: Array<T>;
  size?: number;
  total?: number;
}
