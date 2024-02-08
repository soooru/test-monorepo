import axiosCall from '../axios';
import { ApprDocCardType } from '@/types/dto/documents/appr_doc.dto';

class TempDoc {
  async getTempList(): Promise<any> {
    try {
      const response = await axiosCall.get('/tempdoc');
      const data: ApprDocCardType[] = response.data.data;
      return {
        status: response.status,
        data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}

export default new TempDoc();
