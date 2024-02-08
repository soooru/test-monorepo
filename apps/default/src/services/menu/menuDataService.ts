import { MenuItemType } from '@/types/interface/menu';
import menuData from '@/assets/json/menu.json';

type MenuListType = 'mr' | 'ad';

class MenuDataService {
  getList(param: MenuListType): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        const menuList: { mr: MenuItemType[]; ad: MenuItemType[] } = menuData;
        resolve(menuList[param]);
      }, 10);
    });
  }
}

export default new MenuDataService();
