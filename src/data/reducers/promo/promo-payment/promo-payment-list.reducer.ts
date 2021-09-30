/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type PromoPaymentListInitialProps = models.ListItemProps<
  models.PromoPaymentListSuccessProps[]
>;
/** === INITIAL STATE HERE === */
export const promoPaymentListInitialState: PromoPaymentListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const promoPaymentListReducer = simplifyReducer(
  promoPaymentListInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.PROMO_PAYMENT_LIST_PROCESS](
      state = promoPaymentListInitialState,
      action: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.PROMO_PAYMENT_LIST_SUCCESS](
      state = promoPaymentListInitialState,
      action: models.ListSuccessAction<models.Example[]>,
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
    [types.PROMO_PAYMENT_LIST_FAILED](
      state = promoPaymentListInitialState,
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
    [types.PROMO_PAYMENT_LIST_RESET]() {
      return promoPaymentListInitialState;
    },
    /** => list refresh */
    [types.PROMO_PAYMENT_LIST_REFRESH]() {
      return {
        ...promoPaymentListInitialState,
        refresh: true,
      };
    },
    /** => list load more */
    [types.PROMO_PAYMENT_LIST_LOADMORE](state = promoPaymentListInitialState) {
      return {
        ...state,
        loadMore: true,
      };
    },
  },
);
