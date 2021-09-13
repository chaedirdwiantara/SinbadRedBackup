/** === IMPORT EXTERNAL FUNCTION === */
import apiGeneral from './apiGeneral';
import { ListSuccessProps, DetailSuccessProps } from '@models';
/** === FUNCTION === */
const apiMapping = <T>(
  path: string,
  module: 'account' | 'cart' | 'product',
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  type: 'LIST' | 'DETAIL' | 'CREATE' | 'UPDATE',
  params?: object,
) => {
  switch (type) {
    case 'LIST':
      return apiGeneral<ListSuccessProps<T>>(
        path,
        module,
        version,
        'GET',
        params,
      );
    case 'DETAIL':
      return apiGeneral<DetailSuccessProps<T>>(
        path,
        module,
        version,
        'GET',
        params,
      );
    default:
      break;
  }
};

export default apiMapping;
