/** === IMPORT EXTERNAL FUNCTION === */
import apiMock from './apiMock';
import {
  ListSuccessProps,
  DetailSuccessProps,
  CreateSuccessProps,
  UpdateSuccessProps,
  DeleteSuccessProps,
} from '@models';
/** === FUNCTION === */
const apiMappingMock = <T>(
  mockHost: string,
  path: string,
  module: 'account' | 'cart' | 'product' | 'discount' | 'auth'| 'payment',
  version: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',
  type: 'LIST' | 'DETAIL' | 'CREATE' | 'PUT' | 'PATCH' | 'DELETE',
  params?: object,
) => {
  switch (type) {
    case 'LIST':
      return apiMock<ListSuccessProps<T>>(
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
      return apiMock<CreateSuccessProps>(
        mockHost,
        path,
        module,
        version,
        'POST',
        params,
      );
    case 'PUT':
      return apiMock<UpdateSuccessProps>(
        mockHost,
        path,
        module,
        version,
        'PUT',
        params,
      );
    case 'PATCH':
      return apiMock<UpdateSuccessProps>(
        mockHost,
        path,
        module,
        version,
        'PATCH',
        params,
      );
    case 'DELETE':
      return apiMock<DeleteSuccessProps>(
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
