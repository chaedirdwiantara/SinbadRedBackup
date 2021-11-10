/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.CartSuccessProps = {
  cartId: '',
  data: [],
  storeId: 0,
  isActiveStore: false,
  platform: '',
  userId: 0,
};

/** === FUNCTION === */
export const verificationCartCore = simplifyReducer(initialState, {
  /** => FOR SAVE PAYLOAD VERIFICATION CART FLAG */
  [types.UPDATE_VERIFICATION_CART](
    state = initialState,
    action: models.UpdateVerificationCart,
  ) {
    return {
      ...state,
      cartId: action.payload.cartId,
      data: action.payload.data,
      storeId: action.payload.storeId,
      isActiveStore: action.payload.isActiveStore,
      platform: action.payload.platform,
      userId: action.payload.userId,
    };
  },
});
