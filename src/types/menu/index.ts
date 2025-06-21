export interface Menu {
  fixed?: number;
  id: number;
  name: string;
  orderNum?: number;
  parentId?: number;
  status?: number;
  children?: Menu[];
  menuType?: string;
  showType: number;
  tabNum: number;
}
export interface MainMenu {
  menuId: number;
}
