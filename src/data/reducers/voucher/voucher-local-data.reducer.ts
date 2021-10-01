/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.VoucherDataProps = {
  dataVouchers: null,
};
/** === FUNCTION HERE === */
export const voucher = simplifyReducer(initialState, {
  /** => FOR SAVING SELECTED VOUCHERS DATA */
  [types.SAVE_SELECTED_VOUCHERS](
    state = initialState,
    action: {
      payload: models.selectedVoucherDataProps;
    },
  ) {
    return {
      ...state,
      dataVouchers: action.payload,
    };
  },
});
