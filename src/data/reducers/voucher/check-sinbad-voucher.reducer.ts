/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
import { CheckSinbadVoucherResponse } from '@models';
/** === TYPE HERE === */
export type CheckSinbadVoucherInitialProps =
  models.CreateItemV3Props<CheckSinbadVoucherResponse>;
/** === INITIAL STATE HERE === */
export const checkSinbadVoucherInitialState: CheckSinbadVoucherInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const checkSinbadVoucherReducer = simplifyReducer(
  checkSinbadVoucherInitialState,
  {
    /** => PROCESS */
    [types.CHECK_SINBAD_VOUCHER_PROCESS]() {
      return {
        ...checkSinbadVoucherInitialState,
        loading: true,
      };
    },
    /** => SUCCESS */
    [types.CHECK_SINBAD_VOUCHER_SUCCESS](
      state = checkSinbadVoucherInitialState,
      action: models.CreateSuccessV3Action<models.CheckSinbadVoucherResponse>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => FAILED */
    [types.CHECK_SINBAD_VOUCHER_FAILED](
      state = checkSinbadVoucherInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.CHECK_SINBAD_VOUCHER_RESET]() {
      return checkSinbadVoucherInitialState;
    },
  },
);
