/** === IMPORT INTERNAL === */
import { serializeUniformKeyQs } from '@core/functions/global/query-string';
import apiMappingMock from '@core/services/apiMappingMockV3';
import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';

const getCart = () => {
  const path = 'carts';
  return apiMapping<models.GetCartData>(
    'auth',
    path,
    'buyer-cart',
    'v2',
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
    'v2',
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
    'v2',
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
    'v2',
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
    'v2',
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

const cancelStock = () => {
  const path = 'warehouse-products/cancel-reserve-stock';
  return apiMapping('auth', path, 'warehouse', 'v1', 'DELETE');
};

const checkBuyer = () => {
  const path = 'check-buyer';
  return apiMapping<models.CheckBuyer>('auth', path, 'account', 'v1', 'DETAIL');
};

export const CartApi = {
  getCart,
  getTotalCart,
  addToCart,
  updateCart,
  removeCartProduct,
  checkProduct,
  checkSeller,
  checkStock,
  cancelStock,
  checkBuyer,
};
