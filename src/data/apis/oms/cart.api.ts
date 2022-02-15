/** === IMPORT INTERNAL === */
// import apiMapping from '@core/services/apiMapping';
import apiMappingMockV3 from '@core/services/apiMappingMockV3';
import * as models from '@models';

const exampleCart = () => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = 'example-cart';
  return apiMappingMockV3<models.CartExample>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};

const getCart = () => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'carts';
  return apiMappingMockV3<models.GetCart>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};

const getTotalCart = () => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'total-products';
  return apiMappingMockV3<models.GetTotalCart>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};

const addToCart = (
  data: models.CreateProcessProps<models.AddToCartPayload>,
) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'carts';
  return apiMappingMockV3<
    models.CreateSuccessV3Props<models.AddToCartResponse>
  >(mockHost, path, 'discount', 'v1', 'CREATE', data);
};

const updateCart = (
  data: models.UpdateProcessProps<models.UpdateCartPayload>,
) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'carts';
  return apiMappingMockV3<
    models.CreateSuccessV3Props<models.AddToCartResponse>
  >(mockHost, path, 'discount', 'v1', 'UPDATE', data);
};

const removeCartProduct = (data: models.DeleteProcessProps) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = `remove-cart-products/${data.id}`;
  console.log('abcd', `${mockHost}/${path}/${data.id}`);
  return apiMappingMockV3<models.DeleteSuccessV3Props>(
    mockHost,
    path,
    'discount',
    'v1',
    'UPDATE',
  );
};

export const CartApi = {
  exampleCart,
  getCart,
  getTotalCart,
  addToCart,
  updateCart,
  removeCartProduct,
};
