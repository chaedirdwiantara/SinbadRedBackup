/** === IMPORT EXTERNAL FUNCTION === */
import api from './api';
import { ListSuccessProps } from '../models/list.model';
import { DetailSuccessProps } from '../models/detail.model';
/** === FUNCTION === */
const apiMapping = <T>(
  endpoint: string,
  request: 'LIST' | 'DETAIL' | 'CREATE' | 'UPDATE',
) => {
  switch (request) {
    case 'LIST':
      return api<ListSuccessProps<T>>(endpoint, 'GET');
    case 'DETAIL':
      return api<DetailSuccessProps<T>>(endpoint, 'GET');
    default:
      break;
  }
};

export default apiMapping;
