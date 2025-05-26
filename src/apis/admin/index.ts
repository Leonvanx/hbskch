import request from '@/utils/http';
import type { AxiosRequestConfig } from 'axios';
import type { Page, PageOptions, ResultSuccess, UploadResult, searchOptions, Menu, MainMenu, UploadFileParams, Resource, Link } from '@/types';
// 保存文章
export const savePage = (params: Page, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess>('/tech/article/save', params, config);
};
// 获取所有文章
export const searchPage = (params: PageOptions, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<searchOptions<Page>>>('/tech/article/list', params, config);
};
// 删除文章
export const deletePage = (id: number, config?: AxiosRequestConfig) => {
  return request.delete<ResultSuccess<{ code: number; message: string }>>(`/tech/article/${id}`, {}, config);
};
// 获取所有菜单
export const searchMenu = (params?: Menu, config?: AxiosRequestConfig) => {
  return request.get<ResultSuccess<Menu[]>>('/tech/menu/tree', params, config);
};
// 删除菜单
export const deleteMenu = (id: number, config?: AxiosRequestConfig) => {
  return request.delete<ResultSuccess<{ code: number; message: string }>>(`/tech/menu/${id}`, {}, config);
};
// 保存菜单
export const saveMenu = (params: Menu, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<{ code: number; message: string }>>(`/tech/menu/save`, params, config);
};
// 修改菜单成父菜单
export const saveMainMenu = (params: MainMenu, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<{ code: number; message: string }>>(`/tech/menu/updateSubMenu`, params, config);
};
// 上传文件
export const uploadFile = (file: UploadFileParams, config?: AxiosRequestConfig) => {
  return request.uploadFile<UploadResult<{ url: string; message: string }>>(`/tech/files/upload`, file, config);
};
// 登录
export const login = (params: { username: string; password: string }, config?: AxiosRequestConfig) => {
  return request.post<{ token: string }>(`/tech/auth/login`, params, config);
};
// 修改密码
export const updatePassword = (params: { oldPassword: string; newPassword: string; confirmPassword: string }, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<{ code: number; message: string }>>(`/tech/user/change-password`, params, config);
};
// 获取资源列表
export const searchResource = (codes?: string, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<Resource[]>>('/tech/resource/list', codes?[codes]:null, config);
};
//修改资源
export const updateResource = (params: Resource, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<{ code: number; message: string }>>(`/tech/resource/saveOrUpdate`, params, config);
};
// 获取友情链接列表
export const searchFriendLink = (posType:number,config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<Link[]>>(`/tech/resource/bottom/list?posType=${posType}`, null, config);
};
// 修改友情链接
export const updateFriendLink = (params: Link, config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<{ code: number; message: string }>>(`/tech/resource/bottom/saveOrUpdate`, params, config);
};
// 删除友情链接
export const deleteFriendLink = (id: number, config?: AxiosRequestConfig) => {
  return request.delete<ResultSuccess<{ code: number; message: string }>>(`/tech/resource/${id}`, {}, config);
};
// 对资源管理部分排序
export const sortFriendLink = (params: {id?:number,orderNum?:number}[], config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<{ code: number; message: string }>>(`/tech/resource/order`, params, config);
}
// 对主菜单排序
export const sortMenu = (params: {id?:number,orderNum?:number}[], config?: AxiosRequestConfig) => {
  return request.post<ResultSuccess<{ code: number; message: string }>>(`/tech/menu/order`, params, config);
}
