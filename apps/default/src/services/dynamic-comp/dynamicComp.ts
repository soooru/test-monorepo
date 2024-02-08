import { DynamicCompType } from '@/types/dto/dynamic-comp/dynamic_comp.dto';

class DynamicCompService {
  getCompList(param: string): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        let menuList: DynamicCompType[] = [];
        if (param === 'mrDashboard') {
          menuList = [
            { name: 'TimeLine', compFileName: 'TimeLine', params: {} },
            { name: 'Document', compFileName: 'DashDocument', params: {} },
            { name: 'MDM', compFileName: 'MDM', params: {} },
            { name: 'Notice', compFileName: 'Notice', params: {} },
          ];
        }
        resolve({ data: menuList });
      }, 10);
    });
  }
}

export default new DynamicCompService();
