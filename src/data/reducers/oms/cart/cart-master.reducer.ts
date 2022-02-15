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
  /** => RESET CARD MASTER INTO INITIAL STATE */
  [types.RESET_CART_MASTER]() {
    return initialState;
  },
});
