export interface Resource {
  code: string;
  id?: number;
  name: string;
  createTime?: string;
  updateTime?: string;
  url: string;
}
export interface Link {
  id?: number;
  name: string;
  url: string;
  orderNum?: number;
  delFlag?: number;
  createTime?: string;
  updateTime?: string;
}
