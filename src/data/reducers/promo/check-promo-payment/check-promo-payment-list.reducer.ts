/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type CheckPromoPaymentListInitialProps = models.ListItemProps<
  models.CheckPromoPaymentGetData[]
>;
/** === INITIAL STATE HERE === */
export const checkPromoPaymentListInitialState: CheckPromoPaymentListInitialProps =
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
export const checkPromoPaymentListReducer = simplifyReducer(
  checkPromoPaymentListInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.CHECK_PROMO_PAYMENT_PROCESS](
      state = checkPromoPaymentListInitialState,
      action: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.CHECK_PROMO_PAYMENT_SUCCESS](
      state = checkPromoPaymentListInitialState,
      action: models.ListSuccessAction<models.PromoPaymentListSuccessProps[]>,
    ) {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        loading: false,
        loadMore: false,
        refresh: false,
        total: action.payload.meta.total,
        skip: action.payload.meta.skip,
      };
    },
    /** => list failed */
    [types.CHECK_PROMO_PAYMENT_FAILED](
      state = checkPromoPaymentListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        loadMore: false,
        refresh: false,
        error: action.payload,
      };
    },
    /** => list reset */
    [types.CHECK_PROMO_PAYMENT_RESET]() {
      return checkPromoPaymentListInitialState;
    },
  },
);
