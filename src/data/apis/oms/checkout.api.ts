/** === IMPORT INTERNAL === */
// import apiMapping from '@core/services/apiMapping';
import apiMappingMockV3 from '@core/services/apiMappingMockV3';
import * as models from '@models';

const checkoutCart = (
  data: models.CreateProcessProps<models.CheckoutPayload>,
) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'checkouts';
  return apiMappingMockV3<models.CheckoutResponse>(
    mockHost,
    path,
    'discount',
    'v1',
    'CREATE',
    data,
  );
};

export const CheckoutApi = {
  checkoutCart,
};
