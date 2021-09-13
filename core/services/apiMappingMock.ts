/** === IMPORT EXTERNAL FUNCTION === */
import apiMock from './apiMock';
import { ListSuccessProps, DetailSuccessProps } from '@models';
/** === FUNCTION === */
const apiMapping = <T>(
  mockHost: string,
  path: string,
  type: 'LIST' | 'DETAIL' | 'CREATE' | 'UPDATE',
  params?: object,
) => {
  switch (type) {
    case 'LIST':
      return apiMock<ListSuccessProps<T>>(mockHost, path, 'GET', params);
    case 'DETAIL':
      return apiMock<DetailSuccessProps<T>>(mockHost, path, 'GET', params);
    default:
      break;
  }
};

export default apiMapping;
