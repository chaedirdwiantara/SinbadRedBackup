/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type ThankYouPageCancelOrderInitialProps = models.UpdateItemProps;
/** === INITIAL STATE HERE === */
export const thankYouPageCancelOrderInitialState: ThankYouPageCancelOrderInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const thankYouPageCancelOrderReducer = simplifyReducer(thankYouPageCancelOrderInitialState, {
   /** => update process */
   [types.THANK_YOU_PAGE_CANCEL_ORDER_PROCESS]() {
    return {
      ...thankYouPageCancelOrderInitialState,
      loading: true,
    };
  },
  /** => update success */
  [types.THANK_YOU_PAGE_CANCEL_ORDER_SUCCESS](
    state = thankYouPageCancelOrderInitialState,
    action: models.UpdateSuccessV3Action<models.CancelOrderPayload>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => update failed */
  [types.THANK_YOU_PAGE_CANCEL_ORDER_FAILED](
    state = thankYouPageCancelOrderInitialState,
    action: models.UpdateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => update reset */
  [types.THANK_YOU_PAGE_CANCEL_ORDER_RESET]() {
    return thankYouPageCancelOrderInitialState;
  },
})