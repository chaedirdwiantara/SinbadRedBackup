/** === IMPORT INTERNAL === */
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
  const path = 'carts';
  return apiMapping<models.GetCartData>(
    'auth',
    path,
    'buyer-cart',
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
  const path = `carts/${data.data.id}`;
  return apiMapping<models.UpdateCartResponse>(
    'auth',
    path,
    'buyer-cart',
    'v1',
    'UPDATE',
    {
      buyerName: data.data.buyerName,
      carts: data.data.carts,
    },
  );
};

const removeCartProduct = ({
  data,
}: models.UpdateProcessProps<models.RemoveCartProductPayload>) => {
  const path = `carts/remove-cart-products/${data.cartId}`;
  return apiMapping<models.RemoveCartProductResponse>(
    'auth',
    path,
    'buyer-cart',
    'v1',
    'UPDATE',
    {
      removedProducts: data.removedProducts,
    },
  );
};

const checkProduct = ({
  data,
}: models.CreateProcessProps<models.CheckProductPayload>) => {
  const path = 'check-products';
  return apiMapping<models.CheckProductResponse[]>(
    'auth',
    path,
    'product',
    'v1',
    'CREATE',
    data,
  );
};

const checkSeller = ({
  data,
}: models.CreateProcessProps<models.CheckSellerPayload>) => {
  const qs = serializeUniformKeyQs('sellerIds[]', data.sellerIds);

  const path = `check-sellers?${qs}`;
  return apiMapping<models.CheckSellerResponse[]>(
    'auth',
    path,
    'account',
    'v1',
    'DETAIL',
  );
};

const checkStock = ({
  data,
}: models.CreateProcessProps<models.CheckStockPayload>) => {
  const path = 'warehouse-products/check-stocks';
  return apiMapping<models.CheckStockResponse[]>(
    'auth',
    path,
    'warehouse',
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
  const path = 'warehouse-products/unreserve-stock/1';
  return apiMappingMockV3(mockHost, path, 'warehouse', 'v1', 'DELETE');
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
