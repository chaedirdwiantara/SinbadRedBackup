/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type CheckAllPromoPaymentListInitialProps = models.ListItemProps<
  models.CheckAllPromoPaymentGetData[]
>;
/** === INITIAL STATE HERE === */
export const checkAllPromoPaymentListInitialState: CheckAllPromoPaymentListInitialProps =
  {
    data: [],
    error: null,
    loading: false,
    loadMore: false,
    refresh: false,
    total: 0,
    skip: 0,
  };
/** === FUNCTION HERE === */
export const checkAllPromoPaymentListReducer = simplifyReducer(
  checkAllPromoPaymentListInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.GET_CHECK_PROMO_PAYMENT_PROCESS](
      state = checkAllPromoPaymentListInitialState,
    ) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => list success */
    [types.GET_CHECK_PROMO_PAYMENT_SUCCESS](
      state = checkAllPromoPaymentListInitialState,
      action: models.ListSuccessAction<models.PromoPaymentListSuccessProps[]>,
    ) {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        loading: false,
      };
    },
    /** => list failed */
    [types.GET_CHECK_PROMO_PAYMENT_FAILED](
      state = checkAllPromoPaymentListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => list reset */
    [types.GET_CHECK_PROMO_PAYMENT_RESET]() {
      return checkAllPromoPaymentListInitialState;
    },
  },
);
