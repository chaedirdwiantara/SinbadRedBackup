/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type MerchantEditInitialProps = models.UpdateItemProps;
/** === INITIAL STATE HERE === */
export const merchantEditInitialState: MerchantEditInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const merchantEditReducer = simplifyReducer(merchantEditInitialState, {
  /** ===> DETAIL */
  /** => create process */
  [types.MERCHANT_EDIT_PROCESS]() {
    return {
      ...merchantEditInitialState,
      loading: true,
    };
  },
  /** => create success */
  [types.MERCHANT_EDIT_SUCCESS](
    state = merchantEditInitialState,
    action: models.UpdateSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => create failed */
  [types.MERCHANT_EDIT_FAILED](
    state = merchantEditInitialState,
    action: models.UpdateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => list reset */
  [types.MERCHANT_EDIT_RESET]() {
    return merchantEditInitialState;
  },
});
