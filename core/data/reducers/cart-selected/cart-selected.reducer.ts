/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.CartSelected = {
  id: '',
  data: [],
  isActiveStore: false,
  voucherIds: [],
};

/** === FUNCTION === */
export const verificationCartCore = simplifyReducer(initialState, {
  /** => FOR SAVE PAYLOAD VERIFICATION CART FLAG */
  [types.UPDATE_CART_SELECTED](
    state = initialState,
    action: models.UpdateVerificationCart,
  ) {
    return {
      ...state,
      id: action.payload.id,
      data: action.payload.data,
      isActiveStore: action.payload.isActiveStore,
    };
  },
});
