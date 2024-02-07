import axiosCall from '../axios';
import { TutorialInfoType } from '@/types/dto/tutorial/tutorial_info.dto';

class TutorialDataService {
  async getList(): Promise<any> {
    try {
      console.log('axiosCall getList');
      const response = await axiosCall.get('/');
      console.log('axiosCall getList response', response);
      return response;
    } catch (error) {
      return {
        error,
      };
    }
  }
  async addNew(data: TutorialInfoType): Promise<any> {
    try {
      console.log('axiosCall getList');
      const response = await axiosCall.post('/new', data);
      return response;
    } catch (error) {
      console.log('axiosCall getList error', error);
      return {
        error,
      };
    }
  }
}

export default new TutorialDataService();
