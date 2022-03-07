/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type ThankYouPageOrderDetailInitialProps =
  models.DetailItemProps<models.ThankYouOrderDetailProps>;
/** === INITIAL STATE HERE === */
export const thankYouPageOrderDetailInitialState: ThankYouPageOrderDetailInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const thankYouPageOrderDetailReducer = simplifyReducer(
  thankYouPageOrderDetailInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    [types.THANK_YOU_PAGE_ORDER_DETAIL_PROCESS]() {
      return {
        ...thankYouPageOrderDetailInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.THANK_YOU_PAGE_ORDER_DETAIL_SUCCESS](
      state = thankYouPageOrderDetailInitialState,
      action: models.DetailSuccessAction<models.ThankYouOrderDetailProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.THANK_YOU_PAGE_ORDER_DETAIL_FAILED](
      state = thankYouPageOrderDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.THANK_YOU_PAGE_ORDER_DETAIL_RESET]() {
      return thankYouPageOrderDetailInitialState;
    },
    /** => process */
    [types.THANK_YOU_PAGE_ORDER_DETAIL_LOADING]() {
      return {
        ...thankYouPageOrderDetailInitialState,
        loading: true,
      };
    },
  },
);