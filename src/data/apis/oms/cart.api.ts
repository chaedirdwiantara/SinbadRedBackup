/** === IMPORT INTERNAL === */
// import apiMapping from '@core/services/apiMapping';
import { serializeUniformKeyQs } from '@core/functions/global/query-string';
import apiMappingMockV3 from '@core/services/apiMappingMockV3';
import apiMapping from '@core/services/apiMappingV3';
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
  return apiMappingMockV3<models.GetCartData>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};

const getTotalCart = () => {
  const path = 'carts/total-products';
  return apiMapping<models.GetTotalCart>(
    'auth',
    path,
    'buyer-cart',
    'v1',
    'DETAIL',
  );
};

const addToCart = (
  data: models.CreateProcessProps<models.AddToCartPayload>,
) => {
  const path = 'carts';
  return apiMapping<models.AddToCartResponse>(
    'auth',
    path,
    'buyer-cart',
    'v1',
    'CREATE',
    data.data,
  );
};

const updateCart = (
  data: models.UpdateProcessProps<models.UpdateCartPayload>,
) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = `carts/${data.data.id}`;
  return apiMappingMockV3<models.UpdateCartResponse>(
    mockHost,
    path,
    'discount',
    'v1',
    'UPDATE',
    data,
  );
};

const removeCartProduct = ({
  data,
}: models.UpdateProcessProps<models.RemoveCartProductPayload>) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = `carts/remove-cart-products/${data.cartId}`;
  return apiMappingMockV3<models.RemoveCartProductResponse>(
    mockHost,
    path,
    'discount',
    'v1',
    'UPDATE',
    data.removedProducts,
  );
};

const checkProduct = ({
  data,
}: models.CreateProcessProps<models.CheckProductPayload>) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'check-products';
  return apiMappingMockV3<models.CheckProductResponse[]>(
    mockHost,
    path,
    'discount',
    'v1',
    'CREATE',
    data,
  );
};

const checkSeller = ({
  data,
}: models.CreateProcessProps<models.CheckSellerPayload>) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const qs = serializeUniformKeyQs('sellerIds[]', data.sellerIds);

  const path = `check-sellers?${qs}`;
  return apiMappingMockV3<models.CheckSellerResponse[]>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};

const checkStock = ({
  data,
}: models.CreateProcessProps<models.CheckStockPayload>) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'check-stocks';
  return apiMappingMockV3<models.CheckStockResponse[]>(
    mockHost,
    path,
    'discount',
    'v1',
    'CREATE',
    data,
  );
};

const checkStockReserved = ({
  data,
}: models.CreateProcessProps<models.CheckStockPayload>) => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'check-stocks-reserve';
  return apiMappingMockV3<models.CheckStockResponse[]>(
    mockHost,
    path,
    'discount',
    'v1',
    'CREATE',
    data,
  );
};

const cancelStock = () => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'cancel-reserve-stock';
  return apiMappingMockV3(mockHost, path, 'discount', 'v1', 'DELETE');
};

const cartBuyerAddress = () => {
  const mockHost = 'https://d3d7848e-6688-43ae-b6e0-f436565227b4.mock.pstmn.io';
  const path = 'buyer-address';
  return apiMappingMockV3<models.CartBuyerAddress>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};

export const CartApi = {
  exampleCart,
  getCart,
  getTotalCart,
  addToCart,
  updateCart,
  removeCartProduct,
  checkProduct,
  checkSeller,
  checkStock,
  checkStockReserved,
  cancelStock,
  cartBuyerAddress,
};
