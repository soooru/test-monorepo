// 네비게이션 메뉴 타입 정의
export interface MenuItemType {
  id: string;
  key: string;
  label: string;
  icon?: string;
  subgroup?: SubGroupType[];
}

export interface SubGroupType {
  title: string;
  list: MenuItemType[];
}
