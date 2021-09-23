/** === IMPORT EXTERNAL FUNCTION === */
import apiGeneral from './apiGeneral';
import {
  ListSuccessProps,
  DetailSuccessProps,
  CreateSuccessProps,
  UpdateSuccessProps,
} from '@models';
/** === FUNCTION === */
const apiMapping = <T>(
  path: string,
  module: 'account' | 'cart' | 'product' | 'discount',
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  type: 'LIST' | 'DETAIL' | 'CREATE' | 'PUT' | 'PATCH',
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
    case 'CREATE':
      return apiGeneral<CreateSuccessProps>(
        path,
        module,
        version,
        'POST',
        params,
      );
    case 'PUT':
      return apiGeneral<UpdateSuccessProps>(
        path,
        module,
        version,
        'PUT',
        params,
      );
    case 'PATCH':
      return apiGeneral<UpdateSuccessProps>(
        path,
        module,
        version,
        'PATCH',
        params,
      );
    default:
      break;
  }
};

export default apiMapping;
