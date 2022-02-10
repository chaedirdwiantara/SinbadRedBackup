/** === IMPORT INTERNAL === */
// import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';

const exampleCart = () => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = 'example-cart';
  return apiMappingMock<models.CartExample>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};

export const CartApi = {
  exampleCart,
};
