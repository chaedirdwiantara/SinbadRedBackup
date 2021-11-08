/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '../../models';
import simplifyReducer from '../../../redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.FlagRTDB = {
  isCheckoutLoading: false,
  isInitiateCheckoutLoading: false,
  potentialDiscountId: null,
  isPotentialDiscountLoading: false,
};
/** === FUNCTION HERE === */
export const flagRTDB = simplifyReducer(initialState, {
  [types.CHANGE_FLAG_RTDB](
    state = initialState,
    action: models.isFlagChangeAction,
  ) {
    return {
      ...state,
      [action.payload.key]: action.payload.value,
    };
  },
});
