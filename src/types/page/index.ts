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
  createTime?: string;
  title?: string;
  showType?: number | null;
  publishTime?: string | null;
  publishStatus?: number | null;
}
export interface PageOptions {
  searchWord?: string;
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

export interface searchExpertOptions {
  id?: number;
  displayFields: object;
}
