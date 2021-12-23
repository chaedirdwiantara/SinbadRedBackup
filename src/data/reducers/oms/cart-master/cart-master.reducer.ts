/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.ICartMaster = {
  cartId: '',
  data: [],
  dataEmptyStock: [],
  dataNotFound: [],
  others: [],
  storeId: 0,
  createdAt: '',
  updatedAt: '',
  platform: '',
  userId: 0,
  isActiveStore: false,
  voucherIds: [],
  previouseRouteName: '',
};

/** === FUNCTION === */
export const cartMaster = simplifyReducer(initialState, {
  /** => SAVE PAYLOAD CART MASTER FLAG */
  [types.UPDATE_CART_MASTER](
    state = initialState,
    { payload }: models.UpdateCartMaster,
  ) {
    return {
      ...state,
      cartId: payload.cartId,
      data: payload.data,
      dataNotFound: payload.dataNotFound,
      dataEmptyStock: payload.dataEmptyStock,
      storeId: payload.storeId,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      platform: payload.platform,
      userId: payload.userId,
      isActiveStore: payload.isActiveStore,
      previouseRouteName: '',
    };
  },
  /** =>  DELETE CART PRODUCT FLAG */
  [types.DELETE_CART_PRODUCT](
    state = initialState,
    { payload }: models.DeleteCartProduct,
  ) {
    const newData: models.CartInvoiceGroup[] = [];
    state.data.forEach((invoiceGroup) => {
      const newBrands: models.CartBrand[] = [];
      invoiceGroup.brands.forEach((brand) => {
        const newProducts = brand.products.filter(
          (product) => product.productId !== payload.productId,
        );

        if (newProducts.length > 0) {
          newBrands.push({
            ...brand,
            products: newProducts,
          });
        }
      });

      if (newBrands.length > 0) {
        newData.push({
          ...invoiceGroup,
          brands: newBrands,
        });
      }
    });

    return { ...state, data: newData, previouseRouteName: '' };
  },
  /** => Reset cart master */
  [types.UPDATE_ROUTE_MASTER_DATA](
    state = initialState,
    { payload }: models.UpdateRouteNameMasterCart,
  ) {
    return { ...state, previouseRouteName: payload.previouseRouteName };
  },
  /** => Reset cart master */
  [types.RESET_CART_MASTER_DATA]() {
    return initialState;
  },
});
