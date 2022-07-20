/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CancelVoucherInitialProps = models.DeleteItemV3Props;
/** === INITIAL STATE HERE === */
export const cancelVoucherInitialState: CancelVoucherInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const cancelVoucherReducer = simplifyReducer(cancelVoucherInitialState, {
  /** => PROCESS */
  [types.CANCEL_VOUCHER_PROCESS]() {
    return {
      ...cancelVoucherInitialState,
      loading: false,
    };
  },
  /** => SUCCESS */
  [types.CANCEL_VOUCHER_SUCCESS](
    state = cancelVoucherInitialState,
    action: models.DeleteSuccessV3Action,
  ) {
    return {
      ...state,
      data: action.payload.message,
      loading: false,
    };
  },
  /** => FAILED */
  [types.CANCEL_VOUCHER_FAILED](
    state = cancelVoucherInitialState,
    action: models.DeleteFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => RESET */
  [types.CANCEL_VOUCHER_RESET]() {
    return cancelVoucherInitialState;
  },
});
