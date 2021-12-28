/** === IMPORT EXTERNAL FUNCTION === */
import apiGeneral from './apiGeneral';
import {
  ListSuccessProps,
  DetailSuccessProps,
  CreateSuccessProps,
  UpdateSuccessProps,
  DeleteSuccessProps,
} from '@models';
/** === FUNCTION === */
const apiMapping = <T>(
  access: 'public' | 'auth',
  path: string,
  module:
    | 'account'
    | 'cart'
    | 'product'
    | 'discount'
    | 'auth'
    | 'common'
    | 'banner'
    | 'order'
    | 'payment'
    | 'warehouse'
    | 'order'
    | 'quests',
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  type: 'LIST' | 'DETAIL' | 'CREATE' | 'UPDATE' | 'DELETE',
  params?: object,
) => {
  switch (type) {
    case 'LIST':
      return apiGeneral<ListSuccessProps<T>>(
        access,
        path,
        module,
        version,
        'GET',
        params,
      );
    case 'DETAIL':
      return apiGeneral<DetailSuccessProps<T>>(
        access,
        path,
        module,
        version,
        'GET',
        params,
      );
    case 'CREATE':
      return apiGeneral<CreateSuccessProps>(
        access,
        path,
        module,
        version,
        'POST',
        params,
      );
    case 'UPDATE':
      return apiGeneral<UpdateSuccessProps>(
        access,
        path,
        module,
        version,
        'PATCH',
        params,
      );
    case 'DELETE':
      return apiGeneral<DeleteSuccessProps>(
        access,
        path,
        module,
        version,
        'DELETE',
        params,
      );
    case 'DELETE':
      return apiGeneral<DeleteSuccessProps>(
        access,
        path,
        module,
        version,
        'DELETE',
        params,
      );
    case 'DELETE':
      return apiGeneral<DeleteSuccessProps>(
        access,
        path,
        module,
        version,
        'DELETE',
        params,
      );
    case 'DELETE':
      return apiGeneral<DeleteSuccessProps>(
        access,
        path,
        module,
        version,
        'DELETE',
        params,
      );
    default:
      break;
  }
};

export default apiMapping;
