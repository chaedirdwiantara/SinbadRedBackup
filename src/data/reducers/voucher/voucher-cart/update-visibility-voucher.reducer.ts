/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
import { DataSuccessUpdateV2Props } from '@models';
/** === TYPE HERE === */
export type UpdateVisibilityVoucherInitialProps = models.DeleteItemV3Props;
/** === INITIAL STATE HERE === */
export const updateVisibilityVoucherInitialState: UpdateVisibilityVoucherInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === REDUCER === */
export const updateVisibilityVoucherReducer = simplifyReducer(
  updateVisibilityVoucherInitialState,
  {
    /** => PROCESS */
    [types.UPDATE_VISIBILITY_VOUCHER_PROCESS]() {
      return {
        ...updateVisibilityVoucherInitialState,
        loading: false,
      };
    },
    /** => SUCCESS */
    [types.UPDATE_VISIBILITY_VOUCHER_SUCCESS](
      state = updateVisibilityVoucherInitialState,
      action: models.UpdateSuccessV3Action<DataSuccessUpdateV2Props>,
    ) {
      return {
        ...state,
        data: action.payload.message,
        loading: false,
      };
    },
    /** => FAILED */
    [types.UPDATE_VISIBILITY_VOUCHER_FAILED](
      state = updateVisibilityVoucherInitialState,
      action: models.UpdateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.UPDATE_VISIBILITY_VOUCHER_RESET]() {
      return updateVisibilityVoucherInitialState;
    },
  },
);
