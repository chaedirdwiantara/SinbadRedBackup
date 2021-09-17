/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.GlobalProps = {
  dataCart: null,
  dataVouchers: null,
  isFCM: false,
};
/** === FUNCTION HERE === */
export const global = simplifyReducer(initialState, {
  [types.GLOBAL_PROCESS](state = initialState) {
    return {
      ...state,
      dataCart: null,
    };
  },
  /** => FOR FCM FLAG */
  [types.IS_FCM](state = initialState, action: models.IsFCMAction) {
    return {
      ...state,
      isFCM: action.payload,
    };
  },
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
