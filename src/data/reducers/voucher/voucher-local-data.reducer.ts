/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.VoucherLocalData = {
  selectedSinbadVoucher: null,
};
/** === FUNCTION HERE === */
export const voucher = simplifyReducer(initialState, {
  /** => FOR SAVING SELECTED VOUCHERS DATA */
  [types.SAVE_SELECTED_VOUCHER](
    state = initialState,
    action: {
      payload: models.SaveSelectedVoucher;
    },
  ) {
    return {
      ...state,
      selectedSinbadVoucher: action.payload,
    };
  },
  /** => FOR RESET SELECTED VOUCHERS DATA */
  [types.RESET_SELECTED_VOUCHER](state = initialState) {
    return {
      ...state,
      selectedSinbadVoucher: null,
    };
  },
});
