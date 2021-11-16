/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '../../models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.Permanent = {
  isFCM: false,
  isIntroSinbad: false,
  cartId: null,
};
/** === FUNCTION HERE === */
export const permanentCore = simplifyReducer(initialState, {
  /** => FOR FCM FLAG */
  [types.IS_FCM](state = initialState, action: models.IsFCMAction) {
    return {
      ...state,
      isFCM: action.payload,
    };
  },
  /** => FOR INTRO SINBAD FLAG */
  [types.IS_INTRO_SINBAD](
    state = initialState,
    action: models.IsIntroSinbadAction,
  ) {
    return {
      ...state,
      isIntroSinbad: action.payload,
    };
  },
  /** => FOR SAVE CART ID FLAG */
  [types.CART_ID](state = initialState, action: models.CartId) {
    return {
      ...state,
      cartId: action.payload,
    };
  },
});
