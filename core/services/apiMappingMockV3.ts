/** === IMPORT EXTERNAL FUNCTION === */
import apiMock from './apiMock';
import {
  ListSuccessV3Props,
  DetailSuccessProps,
  CreateSuccessV3Props,
  UpdateSuccessV3Props,
  DeleteSuccessV3Props,
} from '@models';
/** === FUNCTION === */
const apiMappingMock = <T>(
  mockHost: string,
  path: string,
  module:
    | 'account'
    | 'cart'
    | 'product'
    | 'discount'
    | 'auth'
    | 'order'
    | 'payment'
    | 'warehouse'
    | 'voucher',
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  type: 'LIST' | 'DETAIL' | 'CREATE' | 'UPDATE' | 'DELETE',
  params?: object,
) => {
  switch (type) {
    case 'LIST':
      return apiMock<ListSuccessV3Props<T>>(
        mockHost,
        path,
        module,
        version,
        'GET',
        params,
      );
    case 'DETAIL':
      return apiMock<DetailSuccessProps<T>>(
        mockHost,
        path,
        module,
        version,
        'GET',
        params,
      );
    case 'CREATE':
      return apiMock<CreateSuccessV3Props<T>>(
        mockHost,
        path,
        module,
        version,
        'POST',
        params,
      );
    case 'UPDATE':
      return apiMock<UpdateSuccessV3Props<T>>(
        mockHost,
        path,
        module,
        version,
        'PATCH',
        params,
      );
    case 'DELETE':
      return apiMock<DeleteSuccessV3Props>(
        mockHost,
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

export default apiMappingMock;
