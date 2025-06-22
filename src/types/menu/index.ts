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
  tabNum: number | null;
}
export interface MainMenu {
  menuId: number;
}
