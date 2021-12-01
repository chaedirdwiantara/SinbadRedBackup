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
  storeId: 0,
  createdAt: '',
  updatedAt: '',
  platform: '',
  userId: 0,
  isActiveStore: false,
  voucherIds: [],
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
    };
  },
  /** =>  DELETE CART PRODUCT FLAG */
  [types.DELETE_CART_PRODUCT](
    state = initialState,
    { payload }: models.DeleteCartProduct,
  ) {
    const newData = state.data.filter((invoiceGroup) => {
      const newBrands = invoiceGroup.brands.filter((brand) => {
        const newProducts = brand.products.filter((product) => {
          return product.productId !== payload.productId;
        });

        if (newProducts.length > 0) {
          return {
            ...brand,
            products: newProducts,
          };
        }
      });

      if (newBrands.length > 0) {
        return {
          ...invoiceGroup,
          brands: newBrands,
        };
      }
    });

    return { ...state, data: newData };
  },
});
