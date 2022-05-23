/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type paymentMethodListInitialProps = models.ListItemProps<
  models.PaymentMethodList[]
>;
/** === INITIAL STATE HERE === */
export const paymentMethodListInitialState: paymentMethodListInitialProps = {
  data: [],
  error: null,
  loading: true,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const paymentMethodListReducer = simplifyReducer(
  paymentMethodListInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    [types.PAYMENT_METHOD_LIST_PROCESS](
      state = paymentMethodListInitialState,
      { payload }: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: payload.loading,
        error: null,
      };
    },
    /** => success */
    [types.PAYMENT_METHOD_LIST_SUCCESS](
      state = paymentMethodListInitialState,
      { payload }: models.ListSuccessAction<models.PaymentMethodList[]>,
    ) {
      state.error = null;
      return {
        ...state,
        data: [...state.data, ...payload.data],
        loading: false,
        loadMore: false,
        refresh: false,
        total: payload.meta.total,
        skip: payload.meta.skip,
      };
    },
    /** => failed */
    [types.PAYMENT_METHOD_LIST_FAILED](
      state = paymentMethodListInitialState,
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
    /** => reset */
    [types.PAYMENT_METHOD_LIST_RESET]() {
      return paymentMethodListInitialState;
    },
    /** => loading */
    [types.PAYMENT_METHOD_LIST_LOADING]() {
      return {
        ...paymentMethodListInitialState,
        loading: true,
      };
    },
  },
);
