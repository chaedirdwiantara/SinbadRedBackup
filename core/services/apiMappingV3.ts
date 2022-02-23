/** === IMPORT EXTERNAL FUNCTION === */
import apiGeneral from './apiGeneral';
import {
  ListSuccessV3Props,
  DetailSuccessProps,
  CreateSuccessV3Props,
  UpdateSuccessV3Props,
  DeleteSuccessV3Props,
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
    | 'quests'
    | 'ms-buyer-cart',
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  type: 'LIST' | 'DETAIL' | 'CREATE' | 'UPDATE' | 'DELETE',
  params?: object,
) => {
  switch (type) {
    case 'LIST':
      return apiGeneral<ListSuccessV3Props<T>>(
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
      return apiGeneral<CreateSuccessV3Props<T>>(
        access,
        path,
        module,
        version,
        'POST',
        params,
      );
    case 'UPDATE':
      return apiGeneral<UpdateSuccessV3Props<T>>(
        access,
        path,
        module,
        version,
        'PATCH',
        params,
      );
    case 'DELETE':
      return apiGeneral<DeleteSuccessV3Props>(
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
