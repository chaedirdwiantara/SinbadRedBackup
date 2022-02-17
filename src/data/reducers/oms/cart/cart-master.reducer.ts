/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.CartMaster = {
  id: '',
  userId: 0,
  buyerId: 0,
  totalProducts: 0,
  sellers: [],
  unavailable: [],
};

/** === FUNCTION === */
export const cartMaster = simplifyReducer(initialState, {
  /** => SET CART MASTER DATA AFTER FETCH SUCCESS */
  [types.SET_CART_MASTER](
    state = initialState,
    { payload }: models.SetCartMasterAction,
  ) {
    return {
      ...state,
      id: payload.id,
      userId: payload.userId,
      buyerId: payload.buyerId,
      totalProducts: payload.totalProducts,
      sellers: payload.sellers,
    };
  },
  /** => MERGE CHECK PRODUCT DATA */
  [types.MERGE_CHECK_PRODUCT](
    state = initialState,
    { payload }: models.MergeCheckProductAction,
  ) {
    const sellers: models.CartMasterSellers[] = [];
    const unavailable: models.CartMasterUnavailable[] = [];
    /** => replace all getCart product data with checkProduct data */
    for (let i = 0; i < state.sellers.length; i++) {
      const products: models.CartMasterSellersProducts[] = [];
      payload.map((item) => {
        if (item.sellerId === state.sellers[i].sellerId) {
          const thisProduct = state.sellers[i].products.find(
            (innerItem) =>
              innerItem.productId === item.productId &&
              innerItem.warehouseId === item.warehouseId,
          );
          /** => move product data to unavailable if inactive */
          if (item.status === 'inactive') {
            unavailable.push({ ...item, status: 'Produk Tidak Tersedia' });
          } else {
            products.push({
              ...item,
              lastUsedPrice: thisProduct?.lastUsedPrice,
              isLastPriceUsedRules: thisProduct?.isLastPriceUsedRules,
            });
          }
        }
      });
      sellers.push({
        ...state.sellers[i],
        products,
      });
    }
    return {
      ...state,
      sellers: sellers,
      unavailable: unavailable,
    };
  },
  /** => RESET CARD MASTER INTO INITIAL STATE */
  [types.RESET_CART_MASTER]() {
    return initialState;
  },
});
