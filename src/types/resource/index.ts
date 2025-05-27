export interface Resource {
  code: string;
  id?: number;
  name: string;
  createTime?: string;
  updateTime?: string;
  posType?: number;
  url: string;
}
export interface Link {
  id?: number;
  name: string;
  url: string;
  orderNum?: number;
  delFlag?: number;
  enName?: string;
  createTime?: string;
  updateTime?: string;
  posType?: number;
}
