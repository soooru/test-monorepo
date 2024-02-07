import axiosCall from '../axios';
import { ContType } from '@/types/dto/cont/cont.dto';

class ContService {
  async getContList(): Promise<any> {
    try {
      const res = await axiosCall.get('/cont/list');
      const data: ContType[] = res.data.data;
      return {
        status: res.status,
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

export default new ContService();
